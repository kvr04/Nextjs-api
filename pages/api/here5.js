import { prisma } from "../../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client";
import { cors } from "../../lib/cros";

export default async function here5(req, res) {

    // CORS
    if (cors(req, res)) return;

    const method = req.method;

    res.setHeader("Cache-Control", "no-store");

    // Allow only PUT
    if (method !== "PUT") {

        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const {
        student_id,
        student_name,
        grade,
        roll_num,
        class_teacher,
        sport
    } = req.body;

    // Validation
    if (
        student_id === undefined ||
        student_id === null ||
        Number.isNaN(Number(student_id))
    ) {

        return res.status(400).json({
            error: "student_id is required"
        });
    }

    try {

        const updatedStudent =
            await prisma.students.update({

                where: {
                    student_id: Number(student_id)
                },

                data: {
                    student_name,
                    grade: Number(grade),
                    roll_num: Number(roll_num),
                    class_teacher,
                    sport
                }

            });

        return res.status(200).json({

            message: "Updated student info successfully",

            data: updatedStudent

        });

    } catch (error) {

        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {

            return res.status(409).json({

                error: "Student with this roll_num already exists"

            });
        }

        return res.status(500).json({

            error: "Database update failed",

            details:
                error instanceof Error
                    ? error.message
                    : String(error)

        });
    }
}
//http://localhost:3000/api/here5