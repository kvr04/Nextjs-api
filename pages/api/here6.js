import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/cros";

export default async function here6(req, res) {

    // CORS
    if (cors(req, res)) return;

    const method = req.method;

    res.setHeader("Cache-Control", "no-store");

    // Allow only DELETE
    if (method !== "DELETE") {

        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { student_id } = req.query;

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

        await prisma.students.delete({

            where: {
                student_id: Number(student_id)
            }

        });

        return res.status(200).json({

            message: "Student deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            error: "Database delete failed",

            details:
                error instanceof Error
                    ? error.message
                    : String(error)

        });
    }
}
//http://localhost:3000/api/here6?student_id=4