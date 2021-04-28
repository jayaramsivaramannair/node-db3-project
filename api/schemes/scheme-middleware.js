const Schemes = require("./scheme-model.js");
const db = require("../../data/db-config.js");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const { scheme_id } = req.params
    const scheme = await Schemes.findById(scheme_id)
    //Tests if the scheme exists or not
    if (scheme.length < 1) {
      return res.status(404).json({
        message: `scheme with scheme_id ${scheme_id} not found`,
      })

      //Tests if the scheme contains steps or not
    } else if (scheme[0].step_id != null) {
      let stepsArr = scheme.map((element) => {
        return {
          step_id: element.step_id,
          step_number: element.step_number,
          instructions: element.instructions
        }
      })

      req.scheme = {
        scheme_id: scheme[0].scheme_id,
        scheme_name: scheme[0].scheme_name,
        steps: stepsArr,
      }

      next()

      // Executed if the steps do not exist for a scheme
    } else if (scheme[0].step_id === null) {
      req.scheme = {
        scheme_id,
        scheme_name: scheme[0].scheme_name,
        steps: [],
      }

      next()
    }

  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
