import type { APIRoute } from 'astro';
import { getPublishedArticles } from '../utils/articles';
import { SITE_CONFIG } from '../config';

/**
 * /llms.txt, built from the site rather than maintained by hand.
 *
 * The news section is generated from the `berita` collection, so the weekly
 * article pipeline keeps it current with no edit here. The other sections list
 * pages that change rarely and are written out below.
 */

const origin = SITE_CONFIG.url;
const NEWS_LIMIT = 15;

const link = (title: string, path: string, note: string) =>
	`- [${title}](${origin}${path}): ${note}`;

// A description or title with a line break would split one list entry in two.
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();

const STATIC_TOP = `# Solar Nusantara

> PT Tripower Solar Nusantara (SONUS) adalah perusahaan EPC PLTS, manajemen energi, dan penyedia produk panel surya serta bahan bakar biomassa untuk segmen residensial, komersial, dan industri di Indonesia.

## Layanan

${[
	link('Layanan', '/layanan/', 'Ringkasan layanan EPC sistem tenaga surya dan manajemen energi.'),
	link('Sistem Tenaga Surya EPC', '/layanan/sistem-tenaga-surya-epc/', 'EPC PLTS dari rancangan sampai konstruksi untuk tiga segmen: C&I, Solar Home System, dan PJUTS.'),
	link('EPC Segmen C&I', '/layanan/epc/segmen-ci/', 'Rancang bangun, pengadaan, dan konstruksi PLTS skala bisnis untuk sektor komersial dan industri.'),
	link('EPC Segmen SHS', '/layanan/epc/segmen-shs/', 'Solar Home System untuk rumah tangga dan daerah yang belum terjangkau jaringan PLN.'),
	link('Sistem PJUTS', '/layanan/epc/sistem-pjuts/', 'Penerangan jalan umum bertenaga surya yang dapat dipasang tanpa jaringan listrik.'),
	link('Manajemen Energi', '/layanan/manajemen-energi/', 'Pemantauan energi, otomasi bangunan, manajemen armada, dan penangkapan karbon untuk menekan biaya operasional.'),
	link('Sistem Pemantauan Energi untuk C&I', '/layanan/manajemen-energi/sistem-pemantauan-energi-ci/', 'Memantau, mengendalikan, dan mengoptimalkan konsumsi energi perusahaan.'),
	link('Sistem Otomasi Bangunan', '/layanan/manajemen-energi/sistem-otomasi-bangunan/', 'EMAS dan BAS, pemantauan energi real-time plus otomasi pencahayaan dan suhu.'),
	link('Sistem Manajemen Armada', '/layanan/manajemen-energi/sistem-manajemen-armada/', 'Visibilitas digital operasional forklift untuk menekan biaya dan waktu operasi.'),
	link('Sistem Penangkapan Karbon', '/layanan/manajemen-energi/carbon-capture-system/', 'Penangkapan dan penyimpanan emisi CO2 industri sesuai profil emisi tiap klien.'),
	link('Sistem Rumah Pintar', '/layanan/manajemen-energi/sistem-rumah-pintar/', 'Rumah pintar bertenaga surya untuk memangkas tagihan listrik rumah tangga.'),
].join('\n')}

## Produk

${[
	link('Produk', '/produk/', 'Panel surya TKDN dan impor, inverter, sistem baterai, ekosistem EV, dan biomassa.'),
	link('Panel TKDN', '/produk/sistem-panel-surya/panel-surya/panel-tkdn/', 'Panel surya dengan nilai TKDN 43,50 persen dan garansi usia teknis 20 tahun.'),
	link('Panel Impor', '/produk/sistem-panel-surya/panel-surya/panel-impor/', 'Panel surya impor dari pemasok yang dikurasi SONUS.'),
	link('Inverter On-Grid', '/produk/sistem-panel-surya/inverter/on-grid/', 'Mengalirkan kelebihan daya panel surya kembali ke jaringan listrik.'),
	link('Inverter Off-Grid', '/produk/sistem-panel-surya/inverter/off-grid/', 'Untuk sistem panel surya mandiri tanpa jaringan PLN.'),
	link('Sistem Baterai', '/produk/sistem-panel-surya/sistem-baterai/', 'Penyimpanan daya panel surya untuk kebutuhan residensial, komersial, dan industri.'),
	link('Sistem Pemasangan', '/produk/sistem-panel-surya/sistem-pemasangan/', 'Rangka baja MAC dengan ground screw atau pondasi beton untuk lahan miring maupun datar.'),
	link('Sistem Pengkabelan', '/produk/sistem-panel-surya/sistem-pengkabelan/', 'Kabel surya tembaga single-core dan multi-core berlapis PVC.'),
	link('SPKL Pengisian Daya EV', '/produk/ekosistem-ev/spkl/', 'Infrastruktur pengisian kendaraan listrik didukung panel surya dan baterai.'),
	link('Seri 50100 FG', '/produk/seri-50100-fg/', 'Pembangkit surya portabel berbentuk kontainer, tanpa bahan bakar, untuk lokasi terpencil dan daya cadangan.'),
	link('Pelet Kayu', '/produk/energi-biomassa/pelet-kayu/', 'Bahan bakar biomassa dari limbah kayu terkompresi dengan emisi karbon rendah.'),
	link('RDF', '/produk/energi-biomassa/rdf/', 'Refuse-Derived Fuel dari sampah padat perkotaan untuk kiln semen, pembangkit listrik, dan boiler.'),
	link('SRF', '/produk/energi-biomassa/srf/', 'Solid Recovered Fuel dari limbah non-daur ulang berjejak karbon rendah.'),
].join('\n')}

## Tentang Perusahaan

${[
	link('Tentang Solar Nusantara', '/tentang/tentang-solar-nusantara/', 'Profil PT Tripower Solar Nusantara beserta kebijakan K3L dan keselamatan kerja.'),
	link('Visi dan Misi', '/tentang/visi-dan-misi/', 'Menjadi perusahaan terdepan dalam transisi menuju Energi Baru Indonesia.'),
	link('Tim Kita', '/tentang/tim-kita/', 'Jajaran direksi dan tim inti perusahaan.'),
	link('Nilai Sonusian', '/tentang/nilai-sonusian/', 'Prinsip kerja perusahaan.'),
	link('SonusHUB', '/tentang/sonushub/', 'Platform terpadu yang menghubungkan pemangku kepentingan energi terbarukan dan menyediakan material proyek surya.'),
	link('Mitra Bisnis', '/tentang/kolaborasi/mitra-bisnis/', 'Produsen dan distributor teknologi surya mitra SONUS.'),
	link('Mitra Suplier', '/tentang/kolaborasi/mitra-suplier/', 'Pemasok material dan komponen panel surya.'),
	link('PINTAR', '/pintar/', 'Program SonusID untuk membawa akses listrik ke daerah yang belum terjangkau jaringan.'),
].join('\n')}
`;

const STATIC_BOTTOM = `
## Optional

${[
	link('Karir', '/tentang/karir/', 'Lowongan di Solar Nusantara.'),
	link('Tentang Website', '/tentang/tentang-website/', 'Ekosistem digital SonusHUB, Sonus EPC, dan Indonesia Terang.'),
	link('Kebijakan K3L dan Sosial', '/tentang/tentang-solar-nusantara/kebijakan-k3l-dan-sosial/', 'Kebijakan K3L dan sosial yang mengikat manajemen, karyawan, mitra, dan pemasok.'),
	link('Kebijakan Pencegahan Terjatuh', '/tentang/tentang-solar-nusantara/kebijakan-pencegahan-terjatuh/', 'Pedoman keselamatan kerja di ketinggian untuk konstruksi dan pemeliharaan PLTS.'),
].join('\n')}

## Key Facts

- Nama legal: PT Tripower Solar Nusantara (nama dagang: Solar Nusantara, SONUS, Sonus EPC)
- Berdiri: 2019
- Pendiri: Tedi Wintoko
- Kantor pusat: Gandaria Office 8 Tower lantai 8, Jl. Sultan Iskandar Muda No. 8, Kebayoran Lama, Jakarta Selatan 12240, Indonesia
- Bidang usaha: EPC PLTS, manajemen energi, produk panel surya, biomassa (pelet kayu, RDF, SRF)
- Segmen layanan: komersial dan industri (C&I), Solar Home System (SHS), PJUTS
- Bahasa situs: Indonesia

## Contact

- Website: ${origin}
- Email: busdev.sonus@solar-nusantara.id
- Telepon: +62 821 7000 0575
- Jam kerja: Senin-Jumat, 09.00-17.00 WIB
- Halaman kontak: ${origin}/kontak/
- LinkedIn: https://www.linkedin.com/company/solar-nusantara/
- YouTube: https://www.youtube.com/@Sonus.ID_
- Instagram: https://instagram.com/solar_nusantara
`;

export const GET: APIRoute = async () => {
	const posts = (await getPublishedArticles()).slice(0, NEWS_LIMIT);

	const news = [
		link('Berita & Wawasan Energi Surya', '/berita/', 'Artikel dan panduan teknis: perhitungan sistem PLTS, efisiensi panel, komponen, dan industri fotovoltaik.'),
		...posts.map((p) => {
			const note = oneLine(p.data.description ?? '');
			return `- [${oneLine(p.data.title)}](${origin}/berita/${p.slug}/)${note ? `: ${note}` : ''}`;
		}),
	].join('\n');

	const body = `${STATIC_TOP}
## Berita dan Wawasan

${news}
${STATIC_BOTTOM}`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
