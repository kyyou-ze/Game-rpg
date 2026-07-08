/**
 * TextBox
 * Kotak teks generik dipakai untuk narasi/log combat/notifikasi singkat.
 */
export default class TextBox {
  constructor(scene, { y = null, height = 90 } = {}) {
    this.scene = scene;
    const { width, height: sceneHeight } = scene.scale;
    const boxY = y ?? sceneHeight - height - 10;

    this.bg = scene.add.rectangle(width / 2, boxY + height / 2, width - 20, height, 0x000000, 0.75)
      .setStrokeStyle(2, 0xffffff, 0.4);
    this.text = scene.add.text(20, boxY + 10, '', {
      fontSize: '13px', color: '#ffffff', wordWrap: { width: width - 60 }
    });
    this.hide();
  }

  show(text) {
    this.bg.setVisible(true);
    this.text.setVisible(true);
    this.text.setText(text);
  }

  hide() {
    this.bg.setVisible(false);
    this.text.setVisible(false);
  }
}
