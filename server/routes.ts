import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendContactNotification } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
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
