const createOrUpdateObject = async (req, model, customerId) => {
    if (req.body.id) {
      await model.update({
        ...req.body
      }, {
        where: {
          id: req.body.id
        }
      });
      return model.findByPk(req.body.id);
    } else {
      return model.create({
        ...req.body
      });
    }
  };

const updatePriority = async (req, playlistModel, transaction) => {
    if (!req.body.id) {
      const lastPosition = await playlistModel.findOne({
        order: [['position', 'DESC']],
        transaction
      });
      const position = lastPosition ? lastPosition.position + 1 : 1;
      req.body.position = position;
    }
  };

const getOrder = (sort) => {
if (sort) {
    const sortColumns = sort.split(',');
    return sortColumns.map(sortColumn =>
    sortColumn.indexOf('-') === 0 ?
        [sortColumn.substring(1), 'DESC'] :
        [sortColumn, 'ASC']
    );
}
return [];
};

  
module.exports = {
    updatePriority,
    createOrUpdateObject,
    getOrder
  }