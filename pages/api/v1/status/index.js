import database from "infra/database.js"
async function status(request, response){
    const valueMaxConnection = await database.query("show max_connections;");
    const valueVersion = await database.query("show server_version;");
    const nameDb = process.env.POSTGRES_DB;

    const valueConnectionsOpen = await database.query({
        text: `select count(*)::int from pg_stat_activity where datname = $1;`,
        values: [nameDb]
    });

    const updatedAt = new Date().toISOString();
    response.status(200).json({
        updated_at: updatedAt,
        dependencies:{
            database:{
                version: valueVersion.rows[0].server_version,
                max_connections: parseInt(valueMaxConnection.rows[0].max_connections),
                opened_connections: valueConnectionsOpen.rows[0].count
            }
        }
    });
}
export default status;