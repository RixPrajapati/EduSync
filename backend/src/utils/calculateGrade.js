/**
 * Calculates letter grade based on total marks.
 * 90 - 100 => A+
 * 80 - 89  => A
 * 70 - 79  => B+
 * 60 - 69  => B
 * 50 - 59  => C+
 * 40 - 49  => C
 * Below 40 => F
 * 
 * @param {number} totalMarks 
 * @returns {string}
 */
export const calculateGrade = (totalMarks) => {
  if (totalMarks >= 90) {
    return "A+";
  } else if (totalMarks >= 80) {
    return "A";
  } else if (totalMarks >= 70) {
    return "B+";
  } else if (totalMarks >= 60) {
    return "B";
  } else if (totalMarks >= 50) {
    return "C+";
  } else if (totalMarks >= 40) {
    return "C";
  } else {
    return "F";
  }
};
