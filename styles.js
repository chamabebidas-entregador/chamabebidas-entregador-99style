export function palette(mode = 'light') {
  const dark = mode === 'dark';

  return {
    bg: dark ? '#111111' : '#f5f5f5',
    card: dark ? '#1c1c1c' : '#ffffff',
    card2: dark ? '#2a2a2a' : '#eeeeee',
    text: dark ? '#ffffff' : '#111111',
    muted: dark ? '#bbbbbb' : '#666666',
    yellow: '#ffcc00',
    green: '#22c55e',
    line: dark ? '#333333' : '#dddddd',
    map: dark ? '#222222' : '#e5e5e5',
  };
}

export function money(value = 0) {
  return `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;
}
