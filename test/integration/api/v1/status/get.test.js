test("get para api/v1/status returna 200", async () => {
    const r = await fetch("http://127.0.0.1:3000/api/v1/status")
    expect(r.status).toBe(200)
    const responseBody = await r.json()
    
    const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parseUpdatedAt)

    expect(responseBody.dependencies.database.version).toBeDefined();
    expect(responseBody.dependencies.database.version).toEqual("16.0");

    expect(responseBody.dependencies.database.max_connections).toEqual(100);

    expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
