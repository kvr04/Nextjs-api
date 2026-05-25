import { prisma } from "../../lib/prisma";

export default async function here3(req, res) {
    const method = req.method;
    res.setHeader('Cache-Control', 'no-store');

    if (method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const {
        student_name,
        grade,
        roll_num,
        class_teacher,
        sport
    } = req.body;

    try {
        const student = await prisma.students.create({
            data: {
                student_name,
                grade,
                roll_num,
                class_teacher,
                sport
            }
        });

        return res.status(200).json({
            message: "Student added successfully",
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            error: "Database operation failed",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}
//http://localhost:3000/api/here3