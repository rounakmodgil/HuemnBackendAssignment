var Branch = require('../models/branch');


// Display list of all branch.
exports.branch_list = async function(req, res) {
    const allbranches= await Branch.find().populate('students');
    res.json(allbranches);
};

exports.create_branch = function(req, res) {
    const { name, location } = req.body;
    const branch=new Branch({
        name:name,
        location:location
    });
    branch.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((e)=>{
        console.log(e);
        res.sendStatus(500);
    })
};

exports.get_branch=async function(req, res) {
    try {
        const req_branch = await Branch.findById(req.params.id);
        res.json(req_branch);
      } catch (e) {
        console.log(e);
        res.sendStatus(400);
      }
};

exports.delete_branch = async function (req, res) {
    try {
      const deleted_entry = await Branch.findByIdAndDelete(req.params.id);
      res.json(deleted_entry);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
};

exports.update_branch=async function (req, res) {
  const { id, name, location } = req.body;
  try{
    const updated_branch=await Branch.findByIdAndUpdate(id, {$set:{name:name, location:location}});
    res.send(updated_branch);
  }catch(e){
    console.log(e);
    res.status(400).send(e);
  }
};
