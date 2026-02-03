export function generateLibraryPlacement(index: number) {
  const spacing = 0.4;
  const columns = 12;

  const x = (index % columns) * spacing;
  const z = Math.floor(index / columns) * spacing;

  return {
    position: [x, 0, z] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
  };
}
