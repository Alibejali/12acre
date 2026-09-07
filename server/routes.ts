import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendContactNotification } from "./email";

const askVenues = [
  { name: "Boulder Theater", address: "Boulder Theater, Boulder, CO", pocket: "Pearl / Downtown", walk: 24, drive: 9 },
  { name: "eTown Hall", address: "eTown Hall, Boulder, CO", pocket: "Pearl / Downtown", walk: 29, drive: 10 },
  { name: "Canyon Theater", address: "Boulder Public Library, Boulder, CO", pocket: "Pearl / Downtown", walk: 31, drive: 10 },
  { name: "Hotel Boulderado", address: "Hotel Boulderado, Boulder, CO", pocket: "Pearl / Downtown", walk: 23, drive: 8 },
  { name: "Casey Middle School Auditorium", address: "Casey Middle School, Boulder, CO", pocket: "North", walk: 25, drive: 8 },
  { name: "Macky Auditorium Concert Hall", address: "Macky Auditorium, Boulder, CO", pocket: "CU campus", walk: 48, drive: 13 },
  { name: "Muenzinger Auditorium", address: "Muenzinger Auditorium, Boulder, CO", pocket: "CU campus", walk: 52, drive: 14 },
  { name: "Roe Green Theatre", address: "Roe Green Theatre, Boulder, CO", pocket: "CU campus", walk: 51, drive: 14 },
  { name: "Chautauqua Auditorium", address: "Chautauqua Auditorium, Boulder, CO", pocket: "Chautauqua", walk: 58, drive: 15 },
  { name: "Boedecker Theater", address: "Boedecker Theater, Boulder, CO", pocket: "East / Dairy", walk: 53, drive: 13 },
  { name: "Gordon Gamm Theater", address: "Gordon Gamm Theater, Boulder, CO", pocket: "East / Dairy", walk: 53, drive: 13 },
  { name: "Cinemark Century Boulder", address: "Cinemark Century Boulder, Boulder, CO", pocket: "East fringe", walk: 62, drive: 15 },
  { name: "Boulder High School Auditorium", address: "Boulder High School, Boulder, CO", pocket: "Near campus / Central", walk: 42, drive: 12 },
];

function normalizeAsk(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Permanent redirects for event pages promoted to top-level URLs.
  // Add future flattened /events/* paths here before the SPA catch-all.
  app.get("/events/sundance", (req, res) => {
    const query = req.originalUrl.includes("?")
      ? req.originalUrl.slice(req.originalUrl.indexOf("?"))
      : "";
    return res.redirect(301, `/sundance${query}`);
  });

  app.post("/api/sundance-ask", (req, res) => {
    const question = typeof req.body?.question === "string" ? req.body.question.trim().slice(0, 500) : "";
    const base = typeof req.body?.base === "string" ? req.body.base.trim().slice(0, 300) : "Sanitas View, 3303–3339 Broadway, Boulder";
    if (!question) return res.status(400).json({ error: "Please enter a question." });

    const normalized = normalizeAsk(question);
    const venue = askVenues.find((item) => {
      const words = normalizeAsk(item.name).split(" ").filter((word) => word.length > 3);
      return normalizeAsk(item.name).includes(normalized) || words.filter((word) => normalized.includes(word)).length >= Math.min(2, words.length);
    });
    const source = (label: string, url: string) => ({ label, url });

    // Future: Gemma4 primary + rare Claude/Grok escalation on RBC; do not wire LLM.
    if (/(lineup|line up|festival status|films?.*(selected|selection)|did.*(film|movie).*(selected|selection)|when.*(announce|lineup|know)|festival.*(confirm|announce|update)|is.*festival.*(confirm|happen))/.test(normalized)) {
      return res.json({
        intent: "festival_status",
        answer: "I know it is hard to plan around an evolving festival. I don’t publish or predict lineup timing or status here; Sundance is the source to trust for announcements and current festival details.",
        sources: [source("Check Sundance updates", "https://www.sundance.org/")],
      });
    }

    if (venue) {
      const isSanitasBase = normalizeAsk(base).includes("sanitas view") || normalizeAsk(base).includes("3303 3339 broadway");
      return res.json({
        intent: "venue",
        answer: isSanitasBase
          ? `${venue.name} is in the ${venue.pocket} pocket. From Sanitas View, allow roughly ${venue.walk} minutes walking or ${venue.drive} minutes driving before weather, traffic, queues, and parking. Verify the live route in Maps.`
          : `${venue.name} is in the ${venue.pocket} pocket. Your saved base is ${base}. I won’t guess a travel time for a custom origin; use your selected Maps provider below for the live route.`,
        venue,
        base,
        sources: [
          source("Open official Sundance information", "https://www.sundance.org/"),
          source("View the venue in Maps", `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`),
        ],
      });
    }

    if (/(ticket|program|schedule|showtime|screening time)/.test(normalized)) {
      return res.json({
        intent: "logistics",
        answer: "Festival programs, tickets, and showtimes can change. Use Sundance’s official site and the details on your ticket; this companion does not mirror the Institute catalog.",
        sources: [source("Official Sundance program and tickets", "https://www.sundance.org/")],
      });
    }

    if (/(eat|food|restaurant|coffee|transit|bus|rtd|parking|rideshare|walk|snow|ice|weather|between)/.test(normalized)) {
      const transit = /(transit|bus|rtd|parking|rideshare|walk|snow|ice|weather)/.test(normalized);
      return res.json({
        intent: "logistics",
        answer: transit
          ? "Plan around the neighborhood pocket, January conditions, and the time on your ticket. Walk when conditions allow, but keep RTD or rideshare as a backup and verify the live route before leaving."
          : "Choose a stop in the same neighborhood pocket as your next venue, then confirm current hours directly. The Eat guide is a short editorial list rather than a ranking or scraped directory.",
        sources: [
          source(transit ? "Open the Transit guide" : "Open the Eat guide", transit ? "/sundance/guide/transit" : "/sundance/guide/eat"),
          source("Official Sundance information", "https://www.sundance.org/"),
        ],
      });
    }

    const query = question.replace(/^(what should i know about|tell me about|about)\s+/i, "").replace(/[?.!]+$/, "").trim();
    return res.json({
      intent: "film",
      answer: `I don’t republish film synopses, cast details, or showtimes here. Use these live public searches for “${query},” then verify festival status and screening details directly with Sundance and your ticket.`,
      query,
      sources: [
        source("Search Sundance", `https://www.google.com/search?q=${encodeURIComponent(`site:sundance.org ${query}`)}`),
        source("Search FilmFreeway", `https://filmfreeway.com/?search=${encodeURIComponent(query)}`),
        source("Search IMDb", `https://www.imdb.com/find/?q=${encodeURIComponent(query)}`),
      ],
    });
  });
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validation = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromError(validation.error).toString() 
        });
      }

      const submission = await storage.createContactSubmission(validation.data);
      
      // Send email notification (don't block the response)
      sendContactNotification(validation.data).catch(err => {
        console.error("Email notification failed:", err);
      });
      
      return res.status(201).json({ 
        success: true, 
        id: submission.id 
      });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      return res.status(500).json({ 
        error: "Failed to submit contact form" 
      });
    }
  });

  // Get all contact submissions (for admin use)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      return res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      return res.status(500).json({ 
        error: "Failed to fetch submissions" 
      });
    }
  });

  // Delete a contact submission
  app.delete("/api/contact/:id", async (req, res) => {
    try {
      await storage.deleteContactSubmission(req.params.id);
      return res.json({ success: true });
    } catch (error) {
      console.error("Error deleting contact submission:", error);
      return res.status(500).json({ 
        error: "Failed to delete submission" 
      });
    }
  });

  return httpServer;
}
