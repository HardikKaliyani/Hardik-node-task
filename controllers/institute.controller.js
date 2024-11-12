import registeredInstituteModel from "../models/registerd-institutes.js";

// Function used to register the institute
const registerInstitute = async (req, res, next) => {
  try {
    await registeredInstituteModel.create({
      institute: req.body.institute,
      board: req.body.board,
      medium: req.body.medium,
      class: req.body.class,
      standard: req.body.standard,
      subjects: req.body.subjects,
    });
    return res.status(201).send("Institute registered successfully");
  } catch (error) {
    console.log("Error occured while registering the insititute", error);
  }
};

const fetchInsituteDetails = async (req, res, next) => {
  try {
    // fetch institute by id
    const institute = await registeredInstituteModel
      .findOne({ _id: req.params.id })
      .lean();
    // if not found then give error
    if (!institute) {
      return res.status(200).send("Institute details not found");
    }
    const pipeline = [
      {
        $match: {
          isDeleted: false,
        },
      },
    ];
    // fetch school boards details
    pipeline.push({
      $lookup: {
        from: "school-boards",
        let: { boardId: "$board" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$$boardId", "$_id"] } },
          },
          {
            $project: { name: 1 },
          },
        ],
        as: "boardDetails",
      },
    });
    // fetch classes details
    pipeline.push({
      $lookup: {
        from: "classes",
        let: { class: "$class" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$$class", "$_id"] } },
          },
          {
            $project: { type: 1 },
          },
        ],
        as: "classDetails",
      },
    });
    // fetch subjects details
    pipeline.push({
      $lookup: {
        from: "subjects",
        let: { subjects: "$subjects" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", "$$subjects"] },
            },
          },
          {
            $project: { name: 1 },
          },
        ],
        as: "subjectDetails",
      },
    });
    // fetch standard details
    pipeline.push({
      $lookup: {
        from: "standards",
        let: { standard: "$standard" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$$standard", "$_id"],
              },
            },
          },
          {
            $project: { standard: 1 },
          },
        ],
        as: "standardDetails",
      },
    });
    // fetch medium details
    pipeline.push({
      $lookup: {
        from: "mediums",
        let: { medium: "$medium" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$$medium", "$_id"] },
            },
          },
          {
            $project: { type: 1 },
          },
        ],
        as: "mediumDetails",
      },
    });
    const data = await registeredInstituteModel.aggregate(pipeline);

    return res.status(200).json({
      message: '"Institute details fetched successfully',
      data: data,
    });
  } catch (error) {
    console.log("Error occured while registering the insititute", error);
  }
};

export default {
  registerInstitute,
  fetchInsituteDetails,
};
