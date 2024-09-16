test("get para api/v1/status returna 200", async () => {
    r = await fetch("http://127.0.0.1:3000/api/v1/status")
    expect(r.status).toBe(200)
})