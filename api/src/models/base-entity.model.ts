export const BaseEntitySchemaContent = {
  created_on: {
    type: Date,
    default: Date.now,
  },
  last_modified_on: {
    type: Date,
    default: Date.now,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
};
