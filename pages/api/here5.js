import {pool} from '../../lib/database'
export default async function here5(req,res){
    const method = req.method

    if (method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { student_id, student_name, grade, roll_num, class_teacher } = req.body

    try {
        const updatequery = `update "Students" set student_name=$2,
        grade=$3,roll_num=$4,class_teacher=$5 where student_id=$1`
        const values = [student_id, student_name, grade, roll_num, class_teacher]

        await pool.query(updatequery, values)
        return res.status(200).json({ message: "Updated student info successfully" })
    } catch (error) {
        return res.status(500).json({
            error: "Database update failed",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}
//http://localhost:3000/api/here5