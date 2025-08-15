// This spec stubs the API so it doesn't depend on a real backend.
// If you want to hit the real API, remove the cy.intercept(...) calls.

describe("Bookmark Feature", () => {
  const apiBase = Cypress.env("apiBase");

  beforeEach(() => {
    // Optional: seed login state if your UI needs to think you're authenticated
    cy.request("POST", "/api/e2e/login");

    // Intercept and stub the external backend bookmark endpoints
    cy.intercept("POST", `${apiBase}/bookmarks/*`, {
      statusCode: 201,
      body: { message: "Bookmarked" }
    }).as("createBookmark");

    cy.intercept("DELETE", `${apiBase}/bookmarks/*`, {
      statusCode: 200,
      body: { message: "Unbookmarked" }
    }).as("deleteBookmark");

    // Intercept our local Next.js route as well
    cy.intercept("POST", "/api/bookmarks/*", {
      statusCode: 200,
      body: { success: true, bookmarked: true },
    }).as("createBookmarkLocal");
    cy.intercept("DELETE", "/api/bookmarks/*", {
      statusCode: 200,
      body: { success: true, bookmarked: false },
    }).as("deleteBookmarkLocal");

    // If your Bookmarks page fetches a list:
    cy.intercept("GET", `${apiBase}/bookmarks`, {
      statusCode: 200,
      body: {
        bookmarks: [
          // Return one bookmarked job when needed
          // { id: "123", title: "Frontend Developer", ... }
        ]
      }
    }).as("getBookmarks");
  });

  it("toggles bookmark on a job card", () => {
    // Dashboard renders job cards at the home route
    cy.visit("/");

    // Find the first job card's toggle
    cy.get("[aria-label='toggle-bookmark']").first().as("toggle");

    // Initially unbookmarked → aria-pressed should be false
    cy.get("@toggle").should("have.attr", "aria-pressed", "false");

    // Click to bookmark
    cy.get("@toggle").click();
    // Wait for whichever route handles the request in this environment
    cy.wait("@createBookmarkLocal");
    cy.get("@toggle").should("have.attr", "aria-pressed", "true");

    // Click again to unbookmark
    cy.get("@toggle").click();
    cy.wait("@deleteBookmarkLocal");
    cy.get("@toggle").should("have.attr", "aria-pressed", "false");
  });

  it("shows bookmarked job in Bookmarks page", () => {
    // First, simulate bookmarking on the jobs page
    cy.visit("/");
    cy.get("[aria-label='toggle-bookmark']").first().click();
    cy.wait("@createBookmarkLocal");

    // Now make GET /bookmarks return a job so the page can render it
    cy.intercept("GET", `${apiBase}/bookmarks`, {
      statusCode: 200,
      body: {
        bookmarks: [
          {
            id: "123",
            title: "Frontend Developer",
            company: "Tech Co",
            about: { location: "Remote" },
            image: "",
            description: "Build modern UI apps"
          }
        ]
      }
    }).as("getBookmarksAfter");

    // Visit the bookmarks page
    cy.visit("/bookmarks");
    cy.wait("@getBookmarksAfter");

    // Assert the job appears
    cy.contains("Frontend Developer").should("be.visible");
    cy.contains("Tech Co").should("be.visible");
  });
});
