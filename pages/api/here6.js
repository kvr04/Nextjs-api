import {pool} from '../../lib/database'

export default async function here6(req,res){
    const method = req.method
    res.setHeader('Cache-Control', 'no-store')

    if (method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { student_id } = req.query

    if (student_id === undefined || student_id === null || Number.isNaN(Number(student_id))) {
        return res.status(400).json({ error: 'student_id query parameter is required and must be a number' })
    }

    try {
        const deletequery = `delete from "Students" where student_id=$1`
        const values = [Number(student_id)]
        await pool.query(deletequery, values)
        return res.status(200).json({ message: "Student deleted" })
    } catch (error) {
        return res.status(500).json({
            error: "Database delete failed",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}
//http://localhost:3000/api/here6?student_id=4