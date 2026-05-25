import {pool} from '../../lib/database'
export default async function here5(req,res){
    const method = req.method
    res.setHeader('Cache-Control', 'no-store')

    if (method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { student_id, student_name, grade, roll_num, class_teacher } = req.body

    if (student_id === undefined || student_id === null || Number.isNaN(Number(student_id))) {
        return res.status(400).json({ error: 'student_id is required and must be a number' })
    }

    if (!student_name || typeof student_name !== 'string') {
        return res.status(400).json({ error: 'student_name is required' })
    }

    if (grade === undefined || grade === null || Number.isNaN(Number(grade))) {
        return res.status(400).json({ error: 'grade is required and must be a number' })
    }

    if (roll_num === undefined || roll_num === null || Number.isNaN(Number(roll_num))) {
        return res.status(400).json({ error: 'roll_num is required and must be a number' })
    }

    try {
        const updatequery = `update "Students" set student_name=$2,
        grade=$3,roll_num=$4,class_teacher=$5 where student_id=$1`
        const values = [Number(student_id), student_name, Number(grade), Number(roll_num), class_teacher]

        await pool.query(updatequery, values)
        return res.status(200).json({ message: "Updated student info successfully" })
    } catch (error) {
        console.error('here5 update error:', error)

        if (error instanceof Error && error.code === '23505') {
            return res.status(409).json({
                error: 'Student with this roll_num already exists',
                details: 'roll_num'
            })
        }

        return res.status(500).json({
            error: "Database update failed",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}
//http://localhost:3000/api/here5