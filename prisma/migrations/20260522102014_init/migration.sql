-- CreateTable
CREATE TABLE "Students" (
    "student_id" SERIAL NOT NULL,
    "student_name" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "roll_num" INTEGER NOT NULL,
    "class_teacher" TEXT,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Sports" (
    "sport_id" SERIAL NOT NULL,
    "sport_name" TEXT NOT NULL,
    "students_id" INTEGER NOT NULL,

    CONSTRAINT "Sports_pkey" PRIMARY KEY ("sport_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_roll_num_key" ON "Students"("roll_num");

-- AddForeignKey
ALTER TABLE "Sports" ADD CONSTRAINT "Sports_students_id_fkey" FOREIGN KEY ("students_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
