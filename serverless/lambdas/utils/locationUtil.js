const Terraformer = require('terraformer');
const precincts = require('./precincts.json');

module.exports.checkIfIsIn = (item, areas) => {
    if (!item.location) {
        return false;
    }

    const { lng, lat } = item.location;
    const loc = new Terraformer.Point([lng, lat]);
    const filteredFeatures = precincts.features.filter(f => {
        return areas.find(a => a.ward_section_concatenated === f.properties.code);
    });
    return filteredFeatures.find(p => loc.within(new Terraformer.Primitive(p)));
}