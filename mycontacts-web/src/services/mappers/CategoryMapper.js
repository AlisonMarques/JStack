
class CategoryMapper {
  todomain(persistenceCAtegrory) {
    return {
      id: persistenceCAtegrory.id,
      name: persistenceCAtegrory.name,
    };
  }
}

export default new CategoryMapper();
