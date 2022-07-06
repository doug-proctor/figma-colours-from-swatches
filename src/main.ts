export default function () {
  for (const node of figma.root.children) {
    if ("findAll" in node) {
      // @ts-ignore
      const definition: FrameNode[] = node.findAll((node: { name: string | string[]; }) => node.name === "expanded")[0]

      if (definition) {
        // @ts-ignore
        definition.children.map((swatch: RectangleNode) => {
          const token = swatch.name.split(' ')
          const colorName = token[0]
          const colorVariant = token[1]
          const fills: any = swatch.fills
          const color = fills[0].color

          // Create the styles:
          const style = figma.createPaintStyle()
          style.paints = [{ type: 'SOLID', color }]
          style.name = `Base/${colorName}/${colorVariant}`
        })
      }
    }
  }
  figma.closePlugin()
}