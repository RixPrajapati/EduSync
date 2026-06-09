import assignmentService from "../service/assignment.service.js";
import uploadFile from "../utils/fileUploder.js";
const createAssignment = async (req, res) => {
  try {
    req.body.teacherId = req.token.id;

    if (req.files && req.files.length > 0) {
      const uploaded = await uploadFile(req.files);
      req.body.fileUrl = uploaded[0].secure_url;
    }

    const assignment = await assignmentService.createAssignment(req.body);
    res.status(201).json({ data: assignment });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Assignment with this title already exists." });
    }
    res.status(400).json({ message: error.message });
  }
};

const getAssignmentByCourse = async (req, res) => {
  try {
    const assignments = await assignmentService.getAssignmentByCourse(
      req.params.courseId,
    );
    res.status(200).json({ data: assignments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);
    res.status(200).json({ data: assignment });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.updateAssignment(
      req.params.id,
      req.body,
    );
    res.status(200).json({ data: assignment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.deleteAssignment(req.params.id);
    res.status(200).json({ data: "Assignment deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const submitAssignment = async (req, res) => {
  try {
    req.body.studentId = req.token.id;

    if (req.files && req.files.length > 0) {
      const uploaded = await uploadFile(req.files);
      req.body.submittedFile = uploaded[0].secure_url;
    }

    const submission = await assignmentService.submitAssignment(req.body);
    res.status(200).json({ data: submission });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSubmissionsByAssignment = async (req, res) => {
  try {
    const submissions = await assignmentService.getSubmissionsByAssignment(
      req.params.id,
    );
    res.status(200).json({ count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMySubmissions = async (req, res) => {
  try {
    const submissions = await assignmentService.getMySubmissions(req.token.id);
    res.status(200).json({ data: submissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const gradeSummision = async (req, res) => {
  try {
    const { remarks } = req.body;
    const submission = await assignmentService.gradeSummision(
      req.params.submissionId,
      remarks,
    );
    res.status(200).json({ data: submission });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export default {
  createAssignment,
  getAssignmentByCourse,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissionsByAssignment,
  getMySubmissions,
  gradeSummision,
};
