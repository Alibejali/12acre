import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Mail, User, Calendar, Loader2, MessageSquare, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ADMIN_TOKEN_STORAGE_KEY = "adminToken";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

class AdminRequestError extends Error {
  status: number;

  constructor(status: number) {
    super("Admin request failed");
    this.name = "AdminRequestError";
    this.status = status;
  }
}

function readAdminToken(): string | null {
  try {
    const value = sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
    return value && value.length > 0 ? value : null;
  } catch {
    return null;
  }
}

function storeAdminToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
}

function clearStoredAdminToken() {
  try {
    sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    // The in-memory token is cleared even if the browser rejects storage access.
  }
}

function adminHeaders(): HeadersInit {
  const token = readAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function AdminShell({
  children,
  onSignOut,
}: {
  children: ReactNode;
  onSignOut?: () => void;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="bg-primary text-white py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-light.png" alt="12Acre Logo" className="h-8 w-8 object-contain" />
            <span className="font-display font-bold text-xl">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            {onSignOut ? (
              <button
                type="button"
                onClick={onSignOut}
                className="text-white/80 hover:text-white text-sm"
              >
                Sign out
              </button>
            ) : null}
            <a href="/" className="text-white/80 hover:text-white text-sm">
              Back to Site
            </a>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function AdminTokenPrompt({
  notice,
  onSubmit,
}: {
  notice: string | null;
  onSubmit: (token: string) => void;
}) {
  const tokenInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = tokenInputRef.current?.value.trim() ?? "";
    if (tokenInputRef.current) tokenInputRef.current.value = "";
    onSubmit(value);
  }

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Admin sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="post" onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This page is restricted. Enter the admin token to continue. It stays in this browser
              tab session and is sent only to this site.
            </p>
            <div className="space-y-2">
              <Label htmlFor="admin-token">Admin token</Label>
              <Input
                ref={tokenInputRef}
                id="admin-token"
                type="password"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
            </div>
            {notice ? (
              <p role="alert" className="text-sm text-destructive">
                {notice}
              </p>
            ) : null}
            <Button type="submit">Continue</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(() => readAdminToken());
  const [attempt, setAttempt] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (token === null) {
      queryClient.removeQueries({ queryKey: ["contact-submissions"] });
    }
  }, [token, queryClient]);

  function rejectToken(message: string) {
    clearStoredAdminToken();
    setToken(null);
    setNotice(message);
  }

  function signOut() {
    clearStoredAdminToken();
    setToken(null);
    setNotice(null);
  }

  function submitToken(value: string) {
    if (!value) {
      setNotice("Enter the admin token.");
      return;
    }
    try {
      storeAdminToken(value);
    } catch {
      setNotice("This browser could not store the token for the session.");
      return;
    }
    setNotice(null);
    setToken(value);
    setAttempt((current) => current + 1);
  }

  const submissionsQuery = useQuery<ContactSubmission[]>({
    queryKey: ["contact-submissions", attempt],
    enabled: token !== null,
    queryFn: async () => {
      const response = await fetch("/api/contact", { headers: adminHeaders() });
      if (response.status === 401) {
        rejectToken("That token was not accepted.");
        throw new AdminRequestError(401);
      }
      if (!response.ok) {
        throw new AdminRequestError(response.status);
      }
      const body: unknown = await response.json();
      if (!Array.isArray(body)) {
        throw new AdminRequestError(502);
      }
      return body as ContactSubmission[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: adminHeaders(),
      });
      if (response.status === 401) {
        rejectToken("That token was not accepted.");
        throw new AdminRequestError(401);
      }
      if (!response.ok) {
        throw new AdminRequestError(response.status);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast({
        title: "Deleted",
        description: "Contact submission has been removed.",
      });
    },
    onError: (error) => {
      if (error instanceof AdminRequestError && error.status === 401) return;
      toast({
        title: "Error",
        description:
          error instanceof AdminRequestError && error.status === 503
            ? "Admin access is not configured on this server."
            : "Failed to delete submission.",
        variant: "destructive",
      });
    },
  });

  if (token !== null && submissionsQuery.status === "pending") {
    return (
      <AdminShell>
        <main className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </main>
      </AdminShell>
    );
  }

  const authenticated = token !== null && submissionsQuery.status === "success" && Array.isArray(submissionsQuery.data);

  if (!authenticated || !submissionsQuery.data) {
    let promptNotice = notice;
    if (token !== null && submissionsQuery.status === "error") {
      const status = submissionsQuery.error instanceof AdminRequestError ? submissionsQuery.error.status : undefined;
      promptNotice =
        status === 503
          ? "Admin access is not configured on this server."
          : status === 401
            ? "That token was not accepted."
            : "Submissions could not be loaded.";
    }

    return (
      <AdminShell>
        <AdminTokenPrompt notice={promptNotice} onSubmit={submitToken} />
      </AdminShell>
    );
  }

  const submissions = submissionsQuery.data;

  return (
    <AdminShell onSignOut={signOut}>
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Contact Submissions</h1>
            <p className="text-muted-foreground">
              Manage incoming inquiries from your website.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => submissionsQuery.refetch()}
            disabled={submissionsQuery.isRefetching}
          >
            {submissionsQuery.isRefetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2">Refresh</span>
          </Button>
        </div>

        {submissions.length > 0 ? (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{submission.name}</CardTitle>
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          {submission.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(submission.createdAt), "MMM d, yyyy 'at' h:mm a")}
                      </Badge>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this submission?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove the contact submission from {submission.name}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(submission.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                      <p className="text-foreground whitespace-pre-wrap">{submission.message}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" asChild>
                      <a href={`mailto:${submission.email}?subject=Re: Your inquiry to 12Acre`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Reply via Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">No submissions yet</h3>
              <p className="text-muted-foreground max-w-md">
                When visitors submit the contact form on your website, their messages will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </AdminShell>
  );
}
