import {pool} from '../../lib/database'
export default async function here4(req,res){
    const method = req.method
    res.setHeader('Cache-Control', 'no-store')

    if (method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    try {
        const selectquery1 = `select * from "Students"`
        const result = await pool.query(selectquery1)
        return res.status(200).json({ data: result.rows })
    } catch (error) {
        return res.status(500).json({
            error: "Database query failed",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}
//http://localhost:3000/api/here4?studen_id=3
//synchornus----->exexcutes line by line without waiting for pervious lines of code
//asynchornus-----> executes every line wait's for connection if requires 
//only than compiler moves to next line code