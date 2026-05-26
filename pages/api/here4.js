import { prisma } from "../../lib/prisma";
import { cors } from "../../lib/cros";

export default async function here4(req, res) {

    // CORS
    if (cors(req, res)) return;

    const method = req.method;

    res.setHeader("Cache-Control", "no-store");

    // Allow only GET
    if (method !== "GET") {

        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const students = await prisma.students.findMany();

        return res.status(200).json({

            message: "Students fetched successfully",

            data: students

        });

    } catch (error) {

        return res.status(500).json({

            error: "Database query failed",

            details:
                error instanceof Error
                    ? error.message
                    : String(error)

        });
    }
}
//http://localhost:3000/api/here4?studen_id=3
//synchornus----->exexcutes line by line without waiting for pervious lines of code
//asynchornus-----> executes every line wait's for connection if requires 
//only than compiler moves to next line code