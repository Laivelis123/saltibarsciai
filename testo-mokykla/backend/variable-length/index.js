module.exports.rules = {
    "min-var-length": context => ({
        VariableDeclarator: (node) => {
            if (node.id.name != null && node.id.name.length < 5) {
                context.report(node, 'Variable names should be longer than 4 charecters');
            }
        }
    })
}