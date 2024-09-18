import database from "../../../../infra/database.js"
async function status(request, response){
    const r = await database.query("select 1 + 1 as sum;")
    console.log(r.rows)
    response.status(200).json({"chave":"valor"});
}
export default status;