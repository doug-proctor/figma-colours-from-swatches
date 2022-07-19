export default function () {
  for (const node of figma.root.children) {
    if ("findAll" in node) {
      // @ts-ignore
      const definition: FrameNode[] = node.findAll((node: { name: string | string[]; }) => node.name === "_generate")[0]

      if (definition) {
        let row = 1
        let column = 1

        // @ts-ignore
        definition.children.map((swatch: RectangleNode, i: number) => {
          const token = swatch.name.split('/')
          const colorName = token[0]
          const colorVariant = token[1]
          const fills: any = swatch.fills
          const color = fills[0].color

          row = column % 21 === 0 ? row++ : row

          createStyleAndSwatch(color, colorName, colorVariant, i, row)
        })
      }
    }
  }
  // figma.closePlugin()
}

const myFontLoadingFunction = async (font: any) => {
  await figma.loadFontAsync(font)
}

function createStyleAndSwatch(color: any, name: string, variation: string, column: number, row: number) {
  // Create the style!
  const style = figma.createPaintStyle();
  style.paints = [{ type: 'SOLID', color }];
  style.name = `${name}/${variation}`;

  // Create the swatches
  const rect = figma.createRectangle();
  rect.x = column * 150;
  rect.y = row * 200
  rect.fillStyleId = style.id;
  figma.currentPage.appendChild(rect);

  // Create the name label
  const labelName = figma.createText();
  labelName.x = rect.x;
  labelName.y = rect.y + 100;
  const font = { family: "Inter", style: "Bold" }
  myFontLoadingFunction(font).then(() => {
    console.log('loaded')
    labelName.fontName = font;
    labelName.characters = variation;
    labelName.fontSize = 24;
    console.log(labelName)
    figma.currentPage.appendChild(labelName);
  })

  // Create the hex label
  // const labelHex = figma.createText();
  // labelHex.x = rect.x;
  // labelHex.y = rect.y + 130;
  // figma.loadFontAsync(fontName).then(() => {
  //   labelHex.fontName = fontName;
  //   labelHex.characters = hex;
  //   labelHex.fontSize = 18;
  //   figma.currentPage.appendChild(labelHex);
  // });
}