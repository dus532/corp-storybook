export default (type, value) => type.filter(t => t.value === value)[0].body;
