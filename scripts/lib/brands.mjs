/**
 * Brands SonusHUB sells, and the only facts an article about one of them may state.
 *
 * A brand article is a promise about a named company's product, so it gets the same
 * treatment as a number: an allowlist. Every line in `facts` was read off the SonusHUB
 * catalogue (https://sonushub.id/api/products/search, product names grouped by brand)
 * on 2026-10-19. Nothing here comes from a manufacturer's own site or from memory, which
 * is why there is no history, country, ranking or efficiency figure: the catalogue does
 * not carry them, and a model asked to write about a brand fills exactly that gap.
 *
 * Left out on purpose: brands with too few products to describe honestly (Luxpower: two
 * listings of one inverter), brands whose catalogue entries are mostly other makers' cable
 * (KMI Wire & Cable), and brands outside the PLTS material categories (CHINT switchgear,
 * Rucika conduit, Tonata, Bardi, Hikvision). Add one by re-reading the catalogue, not by
 * extrapolating from a neighbour.
 *
 * `product` is the plan's product key, so the article links to that category on SonusHUB
 * and reuses that product's illustration. `aliases` are the spellings fact-guard looks for.
 */
export const BRANDS_CHECKED = '2026-10-19';

export const BRANDS = [
	{
		key: 'aiko', name: 'Aiko Solar', product: 'pv-modul', aliases: ['aiko'],
		facts: [
			'Modul surya Aiko Solar seri Neostar Comet, rentang daya 640-670 Wp.',
			'Modul surya monokristalin Aiko Solar 650 Wp.',
		],
	},
	{
		key: 'jinko', name: 'Jinko Solar', product: 'pv-modul', aliases: ['jinko', 'jinkosolar'],
		facts: [
			'Modul surya Jinko Solar seri Tiger Neo N-Type 630 Wp, kode model JKM605-630N.',
			'Modul surya Jinko Solar kode model JKM560M-72HL4-V.',
			'Modul surya monokristalin Jinko Solar 620 Wp.',
			'Konektor MC4 Jinko Solar untuk kabel PV 4 mm² dan 6 mm².',
		],
	},
	{
		key: 'ja-solar', name: 'JA Solar', product: 'pv-modul', aliases: ['ja solar'],
		facts: [
			'Modul surya JA Solar seri DeepBlue 550 Wp.',
			'Modul surya JA Solar kode model JAM72S30-550/MR.',
		],
	},
	{
		key: 'longi', name: 'LONGi', product: 'pv-modul', aliases: ['longi'],
		facts: [
			'Modul surya LONGi seri Hi-MO 650 Wp.',
			'Modul surya LONGi 555 Wp.',
		],
	},
	{
		key: 'trina', name: 'Trina Solar', product: 'pv-modul', aliases: ['trina', 'trinasolar'],
		facts: [
			'Modul surya Trina Solar seri Vertex, kode model TSM-NE19R, 630 Wp.',
			'Modul surya Trina Solar seri Vertex 575 Wp dan Vertex N 710 Wp.',
			'Modul surya Trina Solar 620 Wp.',
		],
	},
	{
		key: 'huawei', name: 'Huawei', product: 'inverter', aliases: ['huawei'],
		facts: [
			'Inverter on-grid Huawei seri SUN2000-L1 satu fase: 2, 3, 4, 5 dan 6 kW.',
			'Inverter on-grid Huawei seri SUN2000-KTL tiga fase (varian M0, M1, M2, M3, M5): dari 5 kW sampai 115 kW, antara lain SUN2000-50KTL-M3, SUN2000-100KTL-M2 (ada varian dengan AFCI) dan SUN2000-115KTL-M2.',
			'Inverter Huawei kapasitas besar: SUN2000-150K-MG0, SUN2000-185KTL-H1, SUN2000-215KTL-H0, SUN2000-215KTL-H3 dan SUN2000-330KTL-H1.',
			'Optimizer Huawei SUN2000-450W-P.',
			'Perangkat monitoring Huawei: SmartLogger 3000A, Smart Power Sensor DTSU666-H, Smart Dongle (4G dan WiFi).',
			'Baterai Huawei LUNA2000 (modul daya 5 kW dan modul baterai 5 kWh) serta Backup Box satu fase dan tiga fase.',
		],
	},
	{
		key: 'goodwe', name: 'GoodWe', product: 'inverter', aliases: ['goodwe'],
		facts: [
			'Inverter on-grid GoodWe: seri XS (1, 2,5 dan 3 kW), DNS 6 kW, SDT G2 (4 sampai 20 kW) dan SMT 25 kW.',
			'Inverter hybrid GoodWe: seri ES (3,6 sampai 6 kW), EH (3,6 dan 5 kW) dan ET (5, 8 dan 10 kW).',
			'Baterai GoodWe: Lynx Home F (tegangan tinggi) dan baterai litium tegangan rendah 5,4 kWh tipe dinding dan rak.',
			'Smart meter GoodWe GM1000 (satu fase) dan GM3000 (tiga fase).',
		],
	},
	{
		key: 'deye', name: 'Deye', product: 'inverter', aliases: ['deye'],
		facts: [
			'Inverter on-grid Deye satu fase 2 kW, kode model SUN-2K-G04.',
			'Inverter on-grid Deye tiga fase 50 kW (4 MPPT) dan 110 kW (6 MPPT).',
			'Inverter hybrid Deye satu fase baterai 48 V: 3,6, 5, 10 dan 12 kW.',
			'Inverter hybrid Deye tiga fase baterai 48 V: 5, 8, 10 dan 12 kW; dan tiga fase tegangan tinggi 25 kW dan 50 kW.',
		],
	},
	{
		key: 'kabelindo', name: 'Kabelindo', product: 'kabel-ac', aliases: ['kabelindo'],
		facts: [
			'Kabel daya NYY Kabelindo: 1 sampai 4 inti, penampang 1,5 sampai 300 mm².',
			'Kabel NYA Kabelindo (dipakai juga sebagai kabel grounding): penampang 1,5 sampai 400 mm².',
			'Kabel NYAF Kabelindo 1,5 dan 2,5 mm².',
		],
	},
	{
		key: 'sutrado', name: 'Sutrado', product: 'kabel-ac', aliases: ['sutrado'],
		facts: [
			'Kabel daya NYY Sutrado: 1 sampai 4 inti, penampang 1,5 sampai 630 mm².',
			'Kabel NYA Sutrado (dipakai juga sebagai kabel grounding): penampang 1,5 sampai 400 mm².',
			'Kabel NYAF Sutrado 1,5 dan 2,5 mm².',
		],
	},
];

export const brandByKey = (key) => BRANDS.find((b) => b.key === key);
