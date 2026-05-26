import { prisma } from "../../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client";
import { cors } from "../../lib/cros";

export default async function here3(req, res) {

    // CORS middleware
    if (cors(req, res)) return;

    const method = req.method;

    // Prevent caching
    res.setHeader("Cache-Control", "no-store");

    // Allow only POST
    if (method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    // Extract request body
    const {
        student_name,
        grade,
        roll_num,
        class_teacher,
        sport
    } = req.body;

    // Validation
    if (!student_name || typeof student_name !== "string") {
        return res.status(400).json({
            error: "student_name is required"
        });
    }

    if (
        grade === undefined ||
        grade === null ||
        Number.isNaN(Number(grade))
    ) {
        return res.status(400).json({
            error: "grade is required and must be a number"
        });
    }

    if (
        roll_num === undefined ||
        roll_num === null ||
        Number.isNaN(Number(roll_num))
    ) {
        return res.status(400).json({
            error: "roll_num is required and must be a number"
        });
    }

    try {

        // Create student
        const student = await prisma.students.create({

            data: {
                student_name,
                grade: Number(grade),
                roll_num: Number(roll_num),
                class_teacher,
                sport
            }

        });

        console.log("Student inserted:", student);

        return res.status(200).json({

            message: "Student added successfully",

            data: student

        });

    } catch (error) {

        // Duplicate roll number
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {

            return res.status(409).json({

                error: "Student with this roll_num already exists",

                details: error.meta?.target || "roll_num"

            });
        }

        console.log("Database Error:", error);

        return res.status(500).json({

            error: "Database operation failed",

            details:
                error instanceof Error
                    ? error.message
                    : String(error)

        });
    }
}