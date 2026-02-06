/* =========================================================
   DASHBOARD (DESA-LEVEL) STATS
   ========================================================= */

/*-- total panen per varietas (BAR CHART) --*/
export function getTotalPanenByVarietas(panen, tahun) {
  const map = {};

  panen
    .filter(p => p.tahun === tahun)
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

/*-- rata-rata produktivitas kg/ha (BAR CHART) --*/
export function getAvgProduktivitasByVarietas(panen, tahun) {
  const map = {};

  panen
    .filter(p => p.tahun === tahun)
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

/*-- tren panen tahunan per varietas (LINE CHART) --*/
export function getTrendByVarietas(panen) {
  const map = {};

  panen.forEach(p => {
    if (!map[p.tahun]) map[p.tahun] = {};
    if (!map[p.tahun][p.varietas]) map[p.tahun][p.varietas] = 0;

    map[p.tahun][p.varietas] += p.hasilKg || 0;
  });

  return Object.keys(map)
    .sort()
    .map(tahun => ({
      tahun: Number(tahun),
      ...map[tahun]
    }));
}

/* =========================================================
   ANALYSIS (KELOMPOK TANI-LEVEL) STATS
   ========================================================= */

/*-- produktivitas kelompok tani (kg/ha) --*/
export function getGroupProduktivitas(panen, kelompokTani, tahun, musim) {
  const filtered = panen.filter(p =>
    p.kelompokTani === kelompokTani &&
    p.tahun === tahun &&
    (musim === "ALL" || p.musim === musim)
  );

  const totalKg = filtered.reduce((s, p) => s + (p.hasilKg || 0), 0);
  const totalHa = filtered.reduce((s, p) => s + (p.luasHa || 0), 0);

  return totalHa === 0 ? 0 : totalKg / totalHa;
}

/*-- perbandingan panen YoY kelompok tani --*/
export function getGroupHarvestYoY(panen, kelompokTani, tahun, musim) {
  const sumByYear = y =>
    panen
      .filter(p =>
        p.kelompokTani === kelompokTani &&
        p.tahun === y &&
        (musim === "ALL" || p.musim === musim)
      )
      .reduce((s, p) => s + (p.hasilKg || 0), 0);

  return [
    { tahun: tahun - 1, totalKg: sumByYear(tahun - 1) },
    { tahun: tahun, totalKg: sumByYear(tahun) }
  ];
}

/*-- total panen kelompok tani per varietas --*/
export function getGroupHarvestByVarietas(panen, kelompokTani, tahun, musim) {
  const map = {};

  panen
    .filter(p =>
      p.kelompokTani === kelompokTani &&
      p.tahun === tahun &&
      (musim === "ALL" || p.musim === musim)
    )
    .forEach(p => {
      if (!map[p.varietas]) map[p.varietas] = 0;
      map[p.varietas] += p.hasilKg || 0;
    });

  return Object.entries(map).map(([varietas, totalKg]) => ({
    varietas,
    totalKg
  }));
}

/*-- total panen kelompok tani per metode tanam --*/
export function getGroupHarvestByMethod(panen, kelompokTani, tahun, musim) {
  const map = {};

  panen
    .filter(p =>
      p.kelompokTani === kelompokTani &&
      p.tahun === tahun &&
      (musim === "ALL" || p.musim === musim)
    )
    .forEach(p => {
      if (!map[p.metodeTanam]) map[p.metodeTanam] = 0;
      map[p.metodeTanam] += p.hasilKg || 0;
    });

  return Object.entries(map).map(([metodeTanam, totalKg]) => ({
    metodeTanam,
    totalKg
  }));
}

/*-- tren panen kelompok tani per varietas (MULTI-YEAR) --*/
export function getGroupTrendByVarietas(panen, kelompokTani) {
  const map = {};

  panen
    .filter(p => p.kelompokTani === kelompokTani)
    .forEach(p => {
      if (!map[p.tahun]) map[p.tahun] = {};
      if (!map[p.tahun][p.varietas]) map[p.tahun][p.varietas] = 0;

      map[p.tahun][p.varietas] += p.hasilKg || 0;
    });

  return Object.keys(map)
    .sort()
    .map(tahun => ({
      tahun: Number(tahun),
      ...map[tahun]
    }));
}
