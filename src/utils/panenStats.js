/*-- total panen per varietas BAR CHART --*/
export function getTotalPanenByVarietas(panen, year) {
  const map = {};

  panen
    .filter(p => p.tahun === year)
    .forEach(p => {
      if (!map[p.varietas]) {
        map[p.varietas] = 0;
      }
      map[p.varietas] += p.hasilKg || 0;
    });

  return Object.entries(map).map(([varietas, totalKg]) => ({
    varietas,
    totalKg
  }));
}

/*-- rata-rata produktifitas kg/ha --*/
export function getAvgProduktivitasByVarietas(panen, year) {
  const map = {};

  panen
    .filter(p => p.tahun === year)
    .forEach(p => {
      if (!map[p.varietas]) {
        map[p.varietas] = { totalKg: 0, totalHa: 0 };
      }
      map[p.varietas].totalKg += p.hasilKg || 0;
      map[p.varietas].totalHa += p.luasHa || 0;
    });

  return Object.entries(map).map(([varietas, v]) => ({
    varietas,
    kgPerHa: v.totalHa > 0 ? v.totalKg / v.totalHa : 0
  }));
}

/*-- tren panen tahunan per varietas LINE CHART --*/
export function getTrendByVarietas(panen) {
  const map = {};

  panen.forEach(p => {
    if (!map[p.tahun]) map[p.tahun] = {};
    if (!map[p.tahun][p.varietas]) map[p.tahun][p.varietas] = 0;

    map[p.tahun][p.varietas] += p.hasilKg || 0;
  });

  return Object.keys(map)
    .sort()
    .map(year => ({
      year: Number(year),
      ...map[year]
    }));
}
