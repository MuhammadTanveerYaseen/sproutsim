/**
 * Lightweight, optimized GraphQL Client for SproutSIM
 * Executes queries and mutations against /api/graphql with full type safety
 */

export async function fetchGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<{ data?: T; errors?: Array<{ message: string }> }> {
  try {
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        errors: [{ message: `HTTP ${res.status}: ${text || res.statusText}` }],
      };
    }

    return await res.json();
  } catch (err: any) {
    return {
      errors: [{ message: err?.message || "Failed to execute GraphQL query" }],
    };
  }
}
