/**
 * Button
 * Tombol teks interaktif sederhana dipakai di banyak UI (quest board,
 * combat action, menu).
 */
export default class Button {
  constructor(scene, x, y, label, onClick, style = {}) {
    this.text = scene.add.text(x, y, label, {
      fontSize: '13px',
      color: '#ffffff',
      backgroundColor: '#333355',
      padding: { x: 10, y: 6 },
      ...style
    }).setOrigin(style.origin ?? 0).setInteractive({ useHandCursor: true });

    this.text.on('pointerover', () => this.text.setStyle({ backgroundColor: '#55558a' }));
    this.text.on('pointerout', () => this.text.setStyle({ backgroundColor: style.backgroundColor || '#333355' }));
    this.text.on('pointerdown', onClick);
  }

  destroy() {
    this.text.destroy();
  }

  setText(label) {
    this.text.setText(label);
  }
}
