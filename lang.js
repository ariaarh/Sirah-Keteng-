/**
 * Beji Sirah Keteng - Sistem Alih Basa Dinamis & Dialog Kredit/Lokasi
 * Tim Peneliti Cagar Budaya MAN 2 Ponorogo - September 2026
 * 
 * Fitur:
 * - Alih bahasa instan tanpa reload (ID & JV)
 * - Modal Interaktif Kredit & Hak Cipta (MAN 2 Ponorogo, Tim Peneliti, Pembimbing, Kamituwa Jarno)
 * - Peta Lokasi Situs & Tombol Google Maps (https://maps.app.goo.gl/hzqQeifrmbhTNcTr7)
 * - Persistensi preferensi bahasa di localStorage ('beji_site_lang')
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'beji_site_lang';

  // Daftar Terjemahan Frasa & Kalimat
  const PHRASES = [
    // Judul & Header Navigasi
    { id: 'Arsip Digital & Eksplorasi 3D', jv: 'Arsip Digital & Panyelidikan 3D' },
    { id: '01. Pengantar 3D', jv: '01. Pambuka 3D' },
    { id: '02. Elemen Kalamakara', jv: '02. Reroncen Kalamakara' },
    { id: '03. Lini Masa Sejarah', jv: '03. Lampahing Sejarah' },
    { id: '04. Cerita Rakyat (3 Versi)', jv: '04. Crita Rakyat (3 Rumpun)' },
    { id: '05. Monolit Utama', jv: '05. Sela Monolit Utama' },
    { id: '06. Galeri Dokumentasi', jv: '06. Pasarean Dokumèn' },
    { id: 'Pemandu Audio', jv: 'Pandom Swara' },
    { id: 'Video: Aktif', jv: 'Video: Muter' },
    { id: 'Video: Dijeda', jv: 'Video: Kendel' },
    { id: 'Putar / Jeda Video Latar Belakang', jv: 'Muter / Nyuwun Kendel Video Latar' },
    { id: 'Profil Peneliti', jv: 'Profil Panaliti' },
    { id: 'Profil Kurator Cagar Budaya', jv: 'Profil Kurator Cagar Budaya' },
    { id: 'Informasi Kredit, Hak Cipta & Peta Lokasi', jv: 'Katrangan Kredit, Hak Cipta & Peta Papan' },
    { id: 'Sambit, Ponorogo', jv: 'Sambit, Pranaraga' },
    { id: 'NAVIGASI ERA:', jv: 'PANDOM JAMAN:' },
    { id: 'Dukuh Krajan, Desa Bedingin, Sambit', jv: 'Dhukuh Krajan, Dhusun Bedingin, Sambit' },
    { id: 'Dukuh Krajan, Desa Bedingin, Kecamatan Sambit, Ponorogo', jv: 'Dhukuh Krajan, Dhusun Bedingin, Kecamatan Sambit, Ponorogo' },
    { id: 'Situs Cagar Budaya', jv: 'Situs Cagar Budaya' },

    // Halaman 1: index.html
    { id: 'Epigraf & Preservasi No. BSK-01', jv: 'Epigraf & Pangreksa No. BSK-01' },
    { id: 'Ekskavasi Digital Litik Sambit', jv: 'Panyelidikan Digital Sela Sambit' },
    { id: 'Pahatan transkripsi kiasan:', jv: 'Wedharan pralambang tatah:' },
    { id: 'Wajah waktu menelan keburukan duniawi di hulu mata air, meruwat setiap jiwa yang menyentuh tirta suci lereng bumi Ponorogo.', jv: 'Pasuryan Kala ngicalaken memala donya wonten ing sendang, ngrumat sedaya jiwa ingkang nyenggol toya suci bumi Pranaraga.' },
    { id: 'Monolit Suci & Petirtaan Sirah Keteng', jv: 'Sela Monolit Suci & Sendang Sirah Keteng' },
    { id: 'Tersembunyi di petirtaan Dukuh Krajan, Desa Bedingin, Kecamatan Sambit, Ponorogo,', jv: 'Kasinungan ing sendang Dhukuh Krajan, Dhusun Bedingin, Kecamatan Sambit, Ponorogo,' },
    { id: 'merepresentasikan monolit andesit monumental berbentuk kepala raksasa (Kalamakara). Menjadi saksi persimpangan tradisi megalitikum animistik lokal dengan petirtaan suci berhulu mata air alami era Prabu Sri Jayawarsa (1204 M) hingga peradaban klasik Jawa.', jv: 'minangka sela andesit monumental awujud sirah buta (Kalamakara). Dados seksi panyawijining tradisi megalitikum animistik kaliyan sendang suci tuk toya alami jaman Prabu Sri Jayawarsa (1204 M) tumuju peradaban Jawa kuna.' },
    { id: 'Relief wajah menyeringai bermahkota lung-lungan bukan sekadar ornamen penangkal marabahaya; ia difungsikan sebagai penjaga mata air abadi (jaladwara sakral) tempat ruwatan dan pembersihan spiritual masyarakat agraris kuno.', jv: 'Tatah pasuryan nyengir makutha lung-lungan sanes namung rerenggan panulak bebaya; nanging ugi dipun pigunakaken minangka panjaga sendang langgeng (jaladwara suci) kanggé ruwatan sarta reresik spiritual para among tani kina.' },
    { id: 'Parameter Arkeologis Terdaftar', jv: 'Ukuran Kasunyatan Arkeologi' },
    { id: 'Periodisasi', jv: 'Jaman Peradaban' },
    { id: 'Litologi Batuan', jv: 'Wujud Sela' },
    { id: 'Andesit Monolitik', jv: 'Andesit Monolitik' },
    { id: 'Porositas mikro vulkanik', jv: 'Pori-pori mikro redi geni' },
    { id: 'Dimensi Fisik', jv: 'Ukuran Sela' },
    { id: 'Tebal 40–50 cm • Massa: ~1,2 Ton', jv: 'Kandel 40–50 cm • Bobot: ~1,2 Ton' },
    { id: 'Koordinat Geospasial', jv: 'Papan Geospasial' },
    { id: 'Layar Penuh Viewer 3D', jv: 'Layar Kebak Viewer 3D' },
    { id: 'Pelajari Hikayat Sirah Keteng', jv: 'Sinau Lampahan Sirah Keteng' },
    { id: 'Pilih Model 3D GLB:', jv: 'Pilih Modhèl 3D GLB:' },
    { id: 'Model 1 Aktif', jv: 'Modhèl 1 Gesang' },
    { id: 'Model 2 Aktif', jv: 'Modhèl 2 Gesang' },
    { id: 'Model 3 Aktif', jv: 'Modhèl 3 Gesang' },
    { id: 'Model 1: Kalamakara', jv: 'Modhèl 1: Kalamakara' },
    { id: 'Model 2: Watu Pawukon', jv: 'Modhèl 2: Watu Pawukon' },
    { id: 'Model 3: Bangunan Wisata', jv: 'Modhèl 3: Wangunan Wisata' },
    { id: 'Putar Otomatis', jv: 'Muter Otomatis' },
    { id: 'Mode Wireframe', jv: 'Modhe Rangka' },
    { id: 'Tata Cahaya', jv: 'Sorot Cahya' },
    { id: 'Reset Kamera', jv: 'Wangsul Kamera' },
    { id: 'Unduh 3D (.GLB)', jv: 'Undhuh 3D (.GLB)' },
    { id: 'Tampilan 360° Aktif', jv: 'Tampilan 360° Gesang' },
    { id: 'Tahan klik & geser kursor untuk inspeksi artefak', jv: 'Pencet & geser kursor kanggé mriksani reca' },
    { id: 'Eksplorasi Kuratorial Lanjutan', jv: 'Panyelidikan Kuratorial Salajengipun' },
    { id: 'Mata Air & Hidrologi', jv: 'Sendang & Ilining Tirta' },
    { id: 'Tradisi Bersih Desa', jv: 'Adat Bersih Dhusun' },
    { id: 'Kajian Arkeologi MAN 2 Ponorogo', jv: 'Panaliten Arkeologi MAN 2 Ponorogo' },
    { id: 'Analisis debit konstan 18 liter/detik dan sistem tata kelola air sejak era Kediri kuno yang menopang persawahan Sambit.', jv: 'Panaliten ilining toya ajeg 18 liter/detik sarta tata toya wiwit jaman Kadiri kina ingkang nguripi pasawahan Sambit.' },
    { id: 'Ritus tahunan warga Bedingin yang melestarikan kesakralan petirtaan dan arca monolitik leluhur lintas generasi.', jv: 'Upacara adat taunan warga Bedingin kanggé nglestarekaken kasucen sendang sarta reca monolitik para leluhur.' },
    { id: 'Dokumentasi fotogrametri digital 3D, transkripsi Prasasti Sirah Keting 1204 M, dan pemetaan geospasial komprehensif.', jv: 'Dokumèn fotogrametri digital 3D, alih aksara Prasasti Sirah Keting 1204 M, sarta pemetaan papan ingkang komprehensif.' },

    // Halaman 2: elemen-kalamakara.html
    { id: 'Dekomposisi Visual & Elemen Kalamakara', jv: 'Wedharan Visual & Reroncen Kalamakara' },
    { id: 'Kajian morfologi, ikonografi candi, dan struktur petrologi batu andesit monolit Beji Sirah Keteng di Dukuh Krajan, Desa Bedingin, Sambit. Setiap elemen merepresentasikan perpaduan perlindungan spiritual apotropaik dan ketahanan arsitektur hidrologi Jawa Kuno.', jv: 'Kajian morfologi, tata tatah candhi, sarta wujud sela andesit monolit Beji Sirah Keteng wonten ing Dhukuh Krajan, Dhusun Bedingin, Sambit. Saben reroncen nggambaraken panyawijining panulak bebaya apotropaik kaliyan kasantosan tata toya Jawa Kina.' },
    { id: 'Lokasi Arca Saat Ini: Selatan Jalan (Pindah 3x)', jv: 'Papan Reca Sakmenika: Kidul Dalan (Pindhah kaping 3)' },
    { id: 'Posisinya kini berada di selatan jalan persawahan Beji Bedingin setelah 3 kali pemindahan demi penyelamatan dari erosi air dan runtuhnya tanggul.', jv: 'Mapan wonten ing sakiduling margi pasawahan Beji Bedingin sabibaripun kapindhah kaping 3 kanggé nylametaken saking erosi toya lan jugruging tanggul.' },
    { id: 'Skala Massa & Metrologi: 1,2 Ton (1.200 kg)', jv: 'Bobot Sela & Ukuran: 1,2 Ton (1.200 kg)' },
    { id: 'Dimensi terverifikasi lapangan: bentang 110–120 cm, tinggi 80–90 cm, tebal relief 40–50 cm. Dipahat dari blok monolitik andesit tunggal berdensitas tinggi.', jv: 'Ukuran kasunyatan lapangan: jembar 110–120 cm, inggil 80–90 cm, kandel 40–50 cm. Katatah saking bongkahan sela monolitik andesit tunggal ingkang padhet.' },
    { id: 'Orientasi Wajah: Hadap Utara (Apotropaik)', jv: 'Arah Pasuryan: Madhep Lèr (Nulak Bebaya)' },
    { id: 'Menghadap langsung ke arah kolam sendang sebagai penjaga magis sumber air, menolak roh jahat dan mara bahaya sesuai konsep Kala-Makara Jawa Kuno.', jv: 'Madhep lenceng tumuju sendang minangka panjaga gaib sumber toya, nulak memala sarta bebaya jumbuh kaliyan piwulang Kala-Makara Jawa Kina.' },
    { id: 'Saluran Air Jaladwara: Tembus Belakang', jv: 'Pancuran Jaladwara: Tembus Wingking' },
    { id: 'Terdapat lubang saluran silindris kuno di bagian mulut arca yang semula berfungsi menyemburkan air suci dari akuifer mata air alami Beji.', jv: 'Wonten bolongan silindris kina ing perangan cangkem reca ingkang sakawit piguna kanggé mancuraken toya suci saking sumber sendang Beji.' },
    { id: 'Bagian Mahkota & Kepala', jv: 'Perangan Makutha & Pasuryan' },
    { id: 'Sirah Kala', jv: 'Sirah Kala' },
    { id: 'Mahkota & Tengkorak Simbolis', jv: 'Makutha & Pasuryan Simbolis' },
    { id: 'Menampilkan pahatan mata melotot membelalak (netra ambalalak) dengan taring atas masif menjulur ke bawah. Dihiasi motif dedaunan sulur runcing khas langgam transisi Jawa Tengahan menuju Jawa Timuran abad ke-11.', jv: 'Ngetingalaken tatahan netra ambalalak kaliyan siyung inggil masif ingkang mangisor. Karengga motif ron sulur lincip mirunggan gaya transisi Jawa Tengahan tumuju Jawa Timuran abad kaping 11.' },
    { id: 'Saluran Hidrologi Kuno', jv: 'Kanal Ilining Toya Kina' },
    { id: 'Makara & Tirta', jv: 'Makara & Tirta' },
    { id: 'Pancuran Sakral Jaladwara', jv: 'Pancuran Suci Jaladwara' },
    { id: 'Struktur mulut menganga Makara yang berfungsi sebagai corong keluarnya mata air alami (jaladwara). Desain hidrologi ini menyaring air pegunungan yang mengalir langsung ke kolam petirtaan penyucian.', jv: 'Wujud cangkem menga Makara minangka corong medalipun toya sendang alami (jaladwara). Tata toya menika nyaring toya redi ingkang mili lenceng dhateng sendang padasan sesuci.' },
    { id: 'Materialitas & Erosi', jv: 'Wujud Sela & Karosikan' },
    { id: 'Batu Andesit Kuno', jv: 'Sela Andesit Kuno' },
    { id: 'Patina & Pahat Abad ke-11', jv: 'Patina & Tatah Abad kaping 11' },
    { id: 'Komposisi batuan piroklastik andesit kelabu berpori rapat dengan kandungan kuarsa mikro. Lapisan patina lumut kersik (bryophyta) membuktikan kelembapan konstan yang mengawetkan detail goresan pahat tempa besi purba.', jv: 'Wujud sela piroklastik andesit dhiwut kanthi pori-pori kerep ngemu kuarsa mikro. Lapisan lumut alami (bryophyta) dados bukti kahanan teles ingkang ngreksa tilaran tatah wesi kina langkung saking 800 warsa.' },
    { id: 'Ornamen & Epigrafi', jv: 'Rerenggan & Aksara Kina' },
    { id: 'Relief Ragam Hias', jv: 'Rerenggan Lung-lungan' },
    { id: 'Pola Sulur & Bingkai Penyangga', jv: 'Polan Sulur & Rerenggan Candhi' },
    { id: 'Hiasan sekunder berupa dedaunan bergelung spiral (lung-lungan) dan garis geometris penopang monolit. Terdapat goresan samar penanda kalender candrasangkala yang mengindikasikan tahun pemugaran petirtaan.', jv: 'Rerenggan awujud ron nggelung spiral (lung-lungan) sarta garis geometris panopang reca. Wonten tilaran tatah penandha kalender pranata mangsa ingkang nggambaraken jaman pamugaran sendang.' },
    { id: 'FOTO ASLI • MATA MEMBELALAK', jv: 'FOTO ASLI • NETRA AMBALALAK' },
    { id: 'FOTO ASLI • SALURAN AIR', jv: 'FOTO ASLI • PANCURAN TOYA' },
    { id: 'FOTO ASLI • MAKRO TEKSTUR', jv: 'FOTO ASLI • TEKSTUR SELA' },
    { id: 'FOTO ASLI • RELIEF MAHKOTA', jv: 'FOTO ASLI • RERENGGAN MAKUTHA' },

    // Halaman 3: lini-masa-sejarah.html
    { id: 'Kronologi Lini Masa Sejarah Situs Beji Sirah Keteng', jv: 'Lampahing Sejarah Situs Beji Sirah Keteng' },
    { id: 'Rekonstruksi kronologis lima fase peradaban berdasarkan piagam Prasasti Sirah Keting 1204 Masehi, naskah Babad Ponorogo, penuturan sejarah lisan narasumber lapangan Pak Jarno (purna pamong Bedingin 2024), serta riset fotogrametri digital MAN 2 Ponorogo (September 2026).', jv: 'Reroncen lampahing gangsal jaman peradaban adhedhasar serat Prasasti Sirah Keting 1204 Masehi, serat Babad Ponorogo, tutur lisan sesepuh Pak Jarno (purna pamong Bedingin 2024), sarta panaliten fotogrametri digital MAN 2 Ponorogo (September 2026).' },
    { id: 'Fase I: 1204 M (Prasasti Sirah Keting)', jv: 'Jaman I: 1204 M (Prasasti Sirah Keting)' },
    { id: 'Fase II: Abad XV–XVI (Babad Ponorogo)', jv: 'Jaman II: Abad XV–XVI (Babad Ponorogo)' },
    { id: 'Fase III: 1971–1980-an (Plesengan & Wisata)', jv: 'Jaman III: 1971–1980-an (Plesengan & Wisata)' },
    { id: 'Fase IV: 2011–2016 (Bata Merah Kuno)', jv: 'Jaman IV: 2011–2016 (Bata Abrit Kina)' },
    { id: 'Fase V: September 2026 (Riset MAN 2 Ponorogo)', jv: 'Jaman V: September 2026 (Panaliten MAN 2 Ponorogo)' },
    { id: 'Penganugerahan Sima Swatantra Sirah Keting', jv: 'Paring Ganjar Siti Sima Swatantra Sirah Keting' },
    { id: 'Pertarungan Suryangalam & Asal Usul Toponimi', jv: 'Perang Suryangalam & Purwaning Jeneng Papan' },
    { id: 'Pembangunan Plesengan & Kejayaan Pemandian', jv: 'Mangun Plesengan & Kamulyan Sendang Sirah Keteng' },
    { id: 'Renovasi Kolam & Penemuan Pondasi Bata Kuno', jv: 'Dandosi Sendang & Kepanggihing Bata Abrit Kina' },
    { id: 'Digitalisasi Fotogrametri 3D Riset MAN 2 Ponorogo', jv: 'Digitalisasi Fotogrametri 3D Panaliten MAN 2 Ponorogo' },
    { id: 'BUKA MODEL 3D KALA', jv: 'BUKAK MODHÈL 3D KALA' },
    { id: 'PRESERVASI DIGITAL MAN 2 PONOROGO', jv: 'PANGREKSA DIGITAL MAN 2 PONOROGO' },
    { id: 'Narasumber Lisan', jv: 'Sesepuh Tutur Lisan' },
    { id: 'Toponimi Terkait', jv: 'Jeneng Papan Gandheng' },
    { id: 'NARASUMBER: PAK JARNO', jv: 'SESEPUH: PAK JARNO' },

    // Halaman 4: cerita-rakyat.html
    { id: 'Hikayat & Kosmologi Sirah Keteng: Tiga Sudut Pandang Penuturan', jv: 'Hikayat & Kosmologi Sirah Keteng: Tiga Sudut Pandhang Tutur' },
    { id: 'Berdasarkan wawancara sejarah lisan dengan narasumber kunci Pak Jarno (purna tugas pamong / kamituwa Desa Bedingin 2024) serta riset lapangan MAN 2 Ponorogo (September 2026), narasi seputar Beji Sirah Keteng diklasifikasikan secara objektif ke dalam tiga ranah: peristiwa Babad Ponorogo, mitos pewayangan fiktif (disertai catatan kritis ilmiah), serta fakta arkeologis dan hidrologis riil.', jv: 'Kadhudhah saking rembagan sejarah lisan kaliyan sesepuh Pak Jarno (purna tugas pamong / kamituwa Dhusun Bedingin 2024) sarta panaliten lapangan MAN 2 Ponorogo (September 2026), carita ing sakubenge Beji Sirah Keteng kaperang dados tiga: babak Babad Ponorogo, dongeng ringgit fiktif (kanthi panyaring ilmiah), sarta kasunyatan arkeologi lan ilining toya.' },
    { id: 'Babad Ponorogo', jv: 'Babad Pranaraga' },
    { id: 'Duel Suryangalam & Batara Katong', jv: 'Perang Suryangalam & Batara Katong' },
    { id: 'Mitos Pewayangan & Fiksi', jv: 'Mitos Ringgit & Dongèng' },
    { id: 'Rahwana, Ratu Boko & Catatan Kritis', jv: 'Rahwana, Ratu Boko & Panyaring Ilmiah' },
    { id: 'Fakta Arkeologis & Tradisi', jv: 'Kasunyatan Arkeologi & Adat' },
    { id: 'Kalamakara, Pawukon & Kedung Lesung', jv: 'Kalamakara, Pawukon & Kedung Lesung' },
    { id: 'Narasumber Sejarah Lisan', jv: 'Sesepuh Tutur Lisan' },
    { id: 'Pak Jarno (Kamituwa / Purna Pamong 2024)', jv: 'Pak Jarno (Kamituwa / Purna Pamong 2024)' },
    { id: 'Korpus Naskah', jv: 'Serat Babad' },
    { id: 'Babad Ponorogo & Tutur Bedingin', jv: 'Babad Pranaraga & Tutur Bedingin' },
    { id: 'Status Folklor', jv: 'Sipat Carita' },
    { id: 'Sejarah Babad & Toponimi', jv: 'Sejarah Babad & Jeneng Papan' },
    { id: 'Catatan Kritis Narasumber & Verifikasi Faktual', jv: 'Cathetan Kritis Narasumber & Panyaring Ilmiah' },
    { id: 'Arsip Wawancara Pak Jarno', jv: 'Arsip Rembagan Pak Jarno' },
    { id: 'Unduh Arsip Wawancara (.docx)', jv: 'Undhuh Arsip Rembagan (.docx)' },

    // Halaman 5: monolit-utama.html
    { id: 'Monolit Utama: 3D Fotogrametri & Kajian Litik', jv: 'Sela Monolit Utama: Fotogrametri 3D & Panaliten Litik' },
    { id: 'Fotogrametri 3D Scan', jv: 'Fotogrametri 3D Scan' },
    { id: 'Foto 2D Dokumentasi', jv: 'Foto 2D Dokumèn' },
    { id: 'Kajian Litologi & Petrografi', jv: 'Kajian Litologi & Sipat Sela' },
    { id: 'Transliterasi Kawi & Epigrafi', jv: 'Transliterasi Aksara Kawi & Prasasti' },
    { id: 'DENGARKAN KIDUNG KAWI', jv: 'MIRENGAKEN KIDUNG KAWI' },
    { id: 'Bentang / Panjang', jv: 'Jembar / Panjang' },
    { id: 'Tinggi Arca', jv: 'Inggil Reca' },
    { id: 'Tebal Relief ke Belakang', jv: 'Kandel Sela' },
    { id: 'Estimasi Massa', jv: 'Taksiran Bobot' },
    { id: 'UNDUH LAPORAN METROLOGI (.PDF)', jv: 'UNDHUH LAPORAN METROLOGI (.PDF)' },

    // Halaman 6: galeri-dokumentasi.html
    { id: 'Galeri Dokumentasi & Restorasi Lapangan Beji Sirah Keteng', jv: 'Galeri Dokumèn & Panaliten Lapangan Beji Sirah Keteng' },
    { id: 'Semua Media (38 Foto • 2 Video)', jv: 'Sedaya Berkas (38 Foto • 2 Video)' },
    { id: 'Pahatan Monolit (13 Foto)', jv: 'Ukiran Reca (13 Foto)' },
    { id: 'Sendang Mata Air (5 Foto)', jv: 'Sendang Tuk Tirta (5 Foto)' },
    { id: 'Bentang Lingkungan (12 Foto)', jv: 'Rona Lingkungan (12 Foto)' },
    { id: 'Etnografi & Wawancara (8 Foto)', jv: 'Etnografi & Rembagan (8 Foto)' },
    { id: 'Arsip Video Lapangan (2 Video)', jv: 'Arsip Video Lapangan (2 Video)' },
    { id: 'Dinamika Aliran Kejernihan Air Sendang Sirah Keteng', jv: 'Ilining Toya Wening Sendang Sirah Keteng' },
    { id: 'Rekaman langsung dinamika semburan mata air sendang Beji Sirah Keteng yang jernih, mengalir terus menerus dari celah akuifer batuan andesit purba.', jv: 'Rekaman linceng ilining toya wening sendang Beji Sirah Keteng ingkang mili terus menerus saking sela-selaning watu andesit kina.' },
    { id: 'Dokumentasi Lapangan & Tata Lingkungan Beji', jv: 'Dokumèn Lapangan & Swasana Sendang Beji' },
    { id: 'TUTUP LIGHTBOX', jv: 'TUTUP LIGHTBOX' },
    { id: 'Kirim Permohonan via Email', jv: 'Kintun Panyuwunan lumantar Email' },
    { id: 'Salin Teks', jv: 'Turun Seratan' },
    { id: 'Buka Email', jv: 'Bikak Email' },

    // Tambahan UI Desain Stitch Botanical Minimalist & Kinetic Slide Deck
    { id: 'ARSIP DIGITAL LITIK & EKSPLORASI 3D', jv: 'ARSIP DIGITAL SELA & PANYELIDIKAN 3D' },
    { id: 'Koleksi Terbuka', jv: 'Koleksi Kabuka' },
    { id: 'BAGIAN', jv: 'PERANGAN' },
    { id: 'Gulir / Klik:', jv: 'Gulir / Klik:' },
    { id: 'Arsip Preservasi 2026', jv: 'Arsip Pangreksa 2026' },
    { id: 'SITUS CAGAR BUDAYA', jv: 'SITUS CAGAR BUDAYA' },
    { id: 'PILIH MODEL 3D GLB:', jv: 'PILIH MODHÈL 3D GLB:' },
    { id: 'Model 3: Wisata', jv: 'Modhèl 3: Wisata' },
    { id: 'SKALA 1:1 • FOTOGRAMETRI', jv: 'SKALA 1:1 • FOTOGRAMETRI' },
    { id: 'Geser Putar 360° • Scroll Zoom', jv: 'Geser Puter 360° • Scroll Zoom' },
    { id: 'JELAJAH LINGKUNGAN 3D', jv: 'JELAJAH PASRAWUNGAN 3D' },
    { id: 'PARAMETER ARKEOLOGIS SITUS & METADATA TERVERIFIKASI', jv: 'UKURAN ARKEOLOGI SITUS & METADATA KASUNYATAN' },
    { id: 'RISET LAPANGAN MAN 2 PONOROGO • SEPTEMBER 2026', jv: 'PANALITEN LAPANGAN MAN 2 PONOROGO • SEPTEMBER 2026' },
    { id: 'Netra Terbelalak', jv: 'Netra Ambalalak' },
    { id: 'Mulut Pancuran Air', jv: 'Cangkem Pancuran Toya' },
    { id: 'Ukiran Mahkota Kembang', jv: 'Tatahan Makutha Sekar' },
    { id: 'Dekonstruksi Ikonografi Kalamakara Beji Sirah Keteng', jv: 'Wedharan Tatah Kalamakara Beji Sirah Keteng' },
    { id: 'Eksplorasi Lini Masa →', jv: 'Mriksani Lampahing Sejarah →' },
    { id: 'Kronik Peradaban Beji Sirah Keteng (1204 M – 2026)', jv: 'Lampahing Peradaban Beji Sirah Keteng (1204 M – 2026)' },
    { id: 'Buka Cerita Rakyat (3 Versi) →', jv: 'Bukak Crita Rakyat (3 Rumpun) →' },
    { id: 'Putar Pak Jarno', jv: 'Muter Pak Jarno' },
    { id: 'Kidung & Aura ✨', jv: 'Kidung & Aura ✨' },
    { id: 'Monolit Utama: Kajian Litologi, Konservasi & Rekonstruksi 3D', jv: 'Sela Monolit Utama: Kajian Litologi, Pangreksa & Rekonstruksi 3D' },
    { id: 'Buka Mode Walkthrough 3D →', jv: 'Bukak Modhe Walkthrough 3D →' },
    { id: 'Aktifkan Aura ✨', jv: 'Uripaken Aura ✨' },
    { id: 'Galeri Dokumentasi Lapangan & Catatan Konservasi Hidrologis', jv: 'Galeri Dokumèn Lapangan & Cathetan Pangreksa Toya' },
    { id: 'Semua Arsip (40)', jv: 'Sedaya Arsip (40)' },
    { id: 'Pahatan Monolit (12)', jv: 'Ukiran Reca (12)' },
    { id: 'Sendang Mata Air (5)', jv: 'Sendang Tuk Tirta (5)' },
    { id: 'Lingkungan Sekitar (13)', jv: 'Rona Lingkungan (13)' },
    { id: 'Video Lapangan (2)', jv: 'Video Lapangan (2)' },
    { id: 'Permohonan Data Mentah 3D', jv: 'Panyuwunan Dhata Mentah 3D' },
    { id: 'Unduh Foto', jv: 'Undhuh Foto' },
    { id: '01 → 02 • ANATOMI KALAMAKARA', jv: '01 → 02 • WUJUD TATAH KALAMAKARA' },
    { id: '02 → 03 • LINI MASA 1204 M – 2026', jv: '02 → 03 • LAMPAHING SEJARAH 1204 M – 2026' },
    { id: '03 → 04 • TUTUR LISAN & FOLKLOR', jv: '03 → 04 • CRITA TUTUR & FOLKLOR' },
    { id: '04 → 05 • LITOLOGI & REKONSTRUKSI 3D', jv: '04 → 05 • KAJIAN SELA & REKONSTRUKSI 3D' },
    { id: '05 → 06 • GALERI 38 FOTO & 2 VIDEO', jv: '05 → 06 • GALERI 38 FOTO & 2 VIDEO' }
  ];

  // =========================================================================
  // MODAL KREDIT, HAK CIPTA & PETA LOKASI
  // =========================================================================
  function injectCreditModal() {
    if (document.getElementById('credit-location-modal')) return;

    const modalHtml = `
    <div id="credit-location-modal" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm transition-all duration-300 opacity-0 pointer-events-none" style="z-index: 9999;">
      <div id="credit-modal-box" class="relative w-full max-w-4xl bg-surface border border-outline-variant/60 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] transition-transform duration-300 scale-95 overflow-hidden">
        
        <!-- Header Modal -->
        <div class="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-outline-variant/30 bg-surface-container-low shrink-0">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 border border-primary/40 bg-surface flex items-center justify-center p-1 shadow-xs shrink-0">
              <img src="./logo-man2p.png" alt="Logo MAN 2 Ponorogo" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col min-w-0">
              <h2 id="modal-title-text" class="text-base sm:text-lg font-serif font-bold text-on-surface leading-tight truncate">
                Informasi Kredit, Hak Cipta & Peta Lokasi
              </h2>
              <span id="modal-subtitle-text" class="text-[11px] font-mono text-secondary font-bold truncate">
                Situs Petirtaan & Kalamakara Beji Sirah Keteng (Tahun Rilis: 2026)
              </span>
            </div>
          </div>
          <button id="btn-close-credit-modal" type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0 ml-2" title="Tutup Jendela (Esc)">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Body Scrollable -->
        <div class="p-5 sm:p-6 overflow-y-auto space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
            
            <!-- Kolom Kiri: Kredit & Pihak Terlibat (7 cols) -->
            <div class="md:col-span-7 flex flex-col gap-4">
              
              <!-- Instansi & Hak Cipta -->
              <div class="p-4 bg-surface-container-low border border-outline-variant/30 shadow-xs">
                <span id="modal-lbl-instansi" class="text-[10px] uppercase font-mono font-bold text-secondary tracking-widest block mb-1">
                  INSTANSI PENYELENGGARA & HAK CIPTA 🏛️
                </span>
                <div class="flex items-baseline justify-between flex-wrap gap-1">
                  <h3 class="text-base font-serif font-bold text-primary">MAN 2 Ponorogo</h3>
                  <span class="text-[11px] font-mono text-outline font-semibold">Tahun Rilis: 2026</span>
                </div>
                <p id="modal-desc-instansi" class="text-[12px] text-on-surface-variant mt-1 leading-relaxed">
                  Karya riset mandiri siswa dalam dokumentasi fotogrametri 3D, digital twin cagar budaya, serta verifikasi sejarah lisan Beji Sirah Keteng.
                </p>
              </div>

              <!-- Tim Riset & Kurator Digital -->
              <div class="p-4 bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                <div class="flex items-center gap-1.5 pb-2 mb-2 border-b border-outline-variant/20">
                  <span class="material-symbols-outlined text-primary text-[18px]">groups</span>
                  <span id="modal-lbl-team" class="text-[11px] uppercase font-mono font-bold text-primary tracking-wider">
                    TIM RISET FOTOGRAMETRI & KURATOR DIGITAL
                  </span>
                </div>
                <ul class="space-y-1.5 text-[13px] text-on-surface">
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-secondary"></span>
                    <span class="font-semibold">1. Annisa Tri Yulianti</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-secondary"></span>
                    <span class="font-semibold">2. Auliya Fathiyyatul Maghfiroh</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-secondary"></span>
                    <span class="font-semibold">3. Ilham Rofi Anugrah</span>
                  </li>
                </ul>
              </div>

              <!-- Pihak yang Terlibat & Pembimbing -->
              <div class="p-4 bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                <div class="flex items-center gap-1.5 pb-2 mb-2 border-b border-outline-variant/20">
                  <span class="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
                  <span id="modal-lbl-involved" class="text-[11px] uppercase font-mono font-bold text-secondary tracking-wider">
                    PIHAK YANG TERLIBAT & NARASUMBER
                  </span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px] text-on-surface-variant">
                  <div>
                    <span id="modal-lbl-supervisor" class="text-[10px] text-outline uppercase block font-mono">Guru Sejarah & Pembimbing</span>
                    <span class="font-semibold text-on-surface">Wiretno, S.Hum, Gr</span>
                  </div>
                  <div>
                    <span id="modal-lbl-assistant" class="text-[10px] text-outline uppercase block font-mono">Pendamping Riset</span>
                    <span class="font-semibold text-on-surface">Reno Prasnianggara Al Risky</span>
                  </div>
                  <div class="sm:col-span-2 pt-2 border-t border-outline-variant/15">
                    <span id="modal-lbl-elder" class="text-[10px] text-outline uppercase block font-mono">Narasumber Kunci (Sesepuh Desa)</span>
                    <span class="font-semibold text-primary">Kamituwa Jarno (Purna Pamong Bedingin 2024)</span>
                  </div>
                </div>
              </div>

              <!-- Narahubung -->
              <div class="p-3 bg-primary-container/10 border border-primary-container/30 flex items-center justify-between text-[12px] flex-wrap gap-2">
                <div class="flex items-center gap-2.5">
                  <span class="material-symbols-outlined text-primary text-[22px]">call</span>
                  <div>
                    <span class="text-[10px] text-on-surface-variant uppercase block font-mono">Kontak Narahubung</span>
                    <span class="font-mono font-bold text-on-surface">+62 812-5241-5245</span>
                  </div>
                </div>
                <a href="https://wa.me/6281252415245" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 bg-primary text-white text-[11px] font-bold uppercase tracking-wider hover:bg-primary-container transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer">
                  <span>Hubungi</span>
                  <span class="material-symbols-outlined text-[15px]">send</span>
                </a>
              </div>

            </div>

            <!-- Kolom Kanan: Peta Lokasi & Navigasi GPS (5 cols) -->
            <div class="md:col-span-5 flex flex-col gap-3">
              <div class="p-4 bg-surface-container-low border border-outline-variant/30 shadow-xs flex flex-col">
                <div class="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/20">
                  <span id="modal-lbl-map" class="text-[10px] uppercase font-mono font-bold text-primary tracking-widest">
                    PETA LOKASI SITUS
                  </span>
                  <span class="text-[10px] font-mono text-secondary font-bold">2FCQ+2RC</span>
                </div>

                <!-- Foto Lokasi Map -->
                <div class="relative w-full aspect-[4/3] bg-black/10 overflow-hidden border border-outline-variant/40 shadow-xs group">
                  <img src="./foto%20lokasi%20di%20map.png" alt="Peta Lokasi Situs Beji Sirah Keteng" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div class="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 shadow-xs">
                    Peta Google Maps Satelit
                  </div>
                </div>

                <!-- Detail Alamat & Koordinat -->
                <div class="mt-3 space-y-1.5 text-[12px] text-on-surface-variant">
                  <div>
                    <span class="text-[10px] text-outline uppercase block font-mono">Alamat Situs</span>
                    <span class="text-on-surface font-medium leading-tight block">
                      Krajan, Bedingin, Kec. Sambit, Kabupaten Ponorogo, Jawa Timur 63474
                    </span>
                  </div>
                  <div class="flex justify-between items-center pt-1.5 border-t border-outline-variant/15 text-[11px] font-mono">
                    <span class="text-outline">Koordinat GPS:</span>
                    <span class="text-primary font-bold">07°58'48" S 111°29'22" E</span>
                  </div>
                </div>

                <!-- Tombol Buka Map -->
                <a id="btn-open-gmaps" href="https://maps.app.goo.gl/hzqQeifrmbhTNcTr7" target="_blank" rel="noopener noreferrer" class="mt-4 w-full py-2.5 px-4 bg-primary text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-container shadow-md transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-[18px]">location_on</span>
                  <span id="modal-btn-maps-text">Buka Lokasi di Google Maps</span>
                  <span class="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer Modal -->
        <div class="px-5 sm:px-6 py-3 border-t border-outline-variant/30 bg-surface-container-low flex items-center justify-between text-[11px] text-on-surface-variant shrink-0">
          <span id="modal-footer-copy">© 2026 MAN 2 Ponorogo • Riset Mandiri Cagar Budaya</span>
          <button id="btn-footer-close-modal" type="button" class="px-4 py-1.5 bg-surface text-primary border border-outline-variant/50 font-bold uppercase tracking-wider hover:bg-surface-container transition-colors shadow-xs cursor-pointer">
            <span id="modal-btn-close-text">Tutup Jendela</span>
          </button>
        </div>

      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Event Listeners Modal
    const modal = document.getElementById('credit-location-modal');
    const box = document.getElementById('credit-modal-box');
    const btnClose1 = document.getElementById('btn-close-credit-modal');
    const btnClose2 = document.getElementById('btn-footer-close-modal');

    function openModal() {
      if (!modal) return;
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      if (box) {
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      if (box) {
        box.classList.add('scale-95');
        box.classList.remove('scale-100');
      }
      document.body.style.overflow = '';
    }

    btnClose1?.addEventListener('click', closeModal);
    btnClose2?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('opacity-100')) {
        closeModal();
      }
    });

    // Pasang click listener ke tombol profile/person di header (delegasi & direct)
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('#btn-profile-modal, [title*="Profil"], [title*="Kredit"]');
      if (trigger) {
        e.preventDefault();
        openModal();
      }
    });

    document.querySelectorAll('#btn-profile-modal, [title*="Profil"], [title*="Kredit"]').forEach(btn => {
      btn.style.cursor = 'pointer';
    });

    // Update bahasa modal sesuai bahasa aktif
    updateModalLanguage(window.BejiLang ? window.BejiLang.getCurrent() : 'id');
  }

  function updateModalLanguage(lang) {
    const isJv = (lang === 'jv');
    const title = document.getElementById('modal-title-text');
    const sub = document.getElementById('modal-subtitle-text');
    const lblInstansi = document.getElementById('modal-lbl-instansi');
    const descInstansi = document.getElementById('modal-desc-instansi');
    const lblTeam = document.getElementById('modal-lbl-team');
    const lblInvolved = document.getElementById('modal-lbl-involved');
    const lblSupervisor = document.getElementById('modal-lbl-supervisor');
    const lblAssistant = document.getElementById('modal-lbl-assistant');
    const lblElder = document.getElementById('modal-lbl-elder');
    const lblMap = document.getElementById('modal-lbl-map');
    const btnMapsText = document.getElementById('modal-btn-maps-text');
    const btnCloseText = document.getElementById('modal-btn-close-text');
    const footerCopy = document.getElementById('modal-footer-copy');

    if (title) title.textContent = isJv ? 'Katrangan Kredit, Hak Cipta & Peta Papan' : 'Informasi Kredit, Hak Cipta & Peta Lokasi';
    if (sub) sub.textContent = isJv ? 'Situs Petirtaan & Kalamakara Beji Sirah Keteng (Warsa Rilis: 2026)' : 'Situs Petirtaan & Kalamakara Beji Sirah Keteng (Tahun Rilis: 2026)';
    if (lblInstansi) lblInstansi.textContent = isJv ? 'INSTANSI PANALITI & HAK CIPTA 🏛️' : 'INSTANSI PENYELENGGARA & HAK CIPTA 🏛️';
    if (descInstansi) descInstansi.textContent = isJv ? 'Karya panaliten mandhiri para siswa ing babagan fotogrametri 3D, cagar budaya, sarta panyaring sejarah lisan Beji Sirah Keteng.' : 'Karya riset mandiri siswa dalam dokumentasi fotogrametri 3D, digital twin cagar budaya, serta verifikasi sejarah lisan Beji Sirah Keteng.';
    if (lblTeam) lblTeam.textContent = isJv ? 'TIM PANALITI FOTOGRAMETRI & KURATOR DIGITAL' : 'TIM RISET FOTOGRAMETRI & KURATOR DIGITAL';
    if (lblInvolved) lblInvolved.textContent = isJv ? 'PARA PIHAK INGKANG GANDHENG & SESEPUH' : 'PIHAK YANG TERLIBAT & NARASUMBER';
    if (lblSupervisor) lblSupervisor.textContent = isJv ? 'Guru Sejarah & Pamomong Riset' : 'Guru Sejarah & Pembimbing';
    if (lblAssistant) lblAssistant.textContent = isJv ? 'Pangamping Riset' : 'Pendamping Riset';
    if (lblElder) lblElder.textContent = isJv ? 'Narasumber Kunci (Sesepuh Desa)' : 'Narasumber Kunci (Sesepuh Desa)';
    if (lblMap) lblMap.textContent = isJv ? 'PETA PAPAN SITUS' : 'PETA LOKASI SITUS';
    if (btnMapsText) btnMapsText.textContent = isJv ? 'Bukak Papan ing Google Maps' : 'Buka Lokasi di Google Maps';
    if (btnCloseText) btnCloseText.textContent = isJv ? 'Tutup Jendhela' : 'Tutup Jendela';
    if (footerCopy) footerCopy.textContent = isJv ? '© 2026 MAN 2 Ponorogo • Panaliten Mandhiri Cagar Budaya' : '© 2026 MAN 2 Ponorogo • Riset Mandiri Cagar Budaya';
  }

  // =========================================================================
  // SISTEM NAVIGASI MOBILE & MODUL KINETIK (DRAWER 01–06)
  // =========================================================================
  const NAV_ITEMS = [
    { href: 'index.html#sec-0', secIdx: 0, num: '01', id: 'Pengantar 3D', jv: 'Pambuka 3D', icon: 'view_in_ar' },
    { href: 'index.html#sec-1', secIdx: 1, num: '02', id: 'Elemen Kalamakara', jv: 'Reroncen Kalamakara', icon: 'account_tree' },
    { href: 'index.html#sec-2', secIdx: 2, num: '03', id: 'Lini Masa Sejarah', jv: 'Lampahing Sejarah', icon: 'history_edu' },
    { href: 'index.html#sec-3', secIdx: 3, num: '04', id: 'Cerita Rakyat (3 Versi)', jv: 'Crita Rakyat (3 Rumpun)', icon: 'auto_stories' },
    { href: 'index.html#sec-4', secIdx: 4, num: '05', id: 'Monolit Utama', jv: 'Sela Monolit Utama', icon: 'architecture' },
    { href: 'index.html#sec-5', secIdx: 5, num: '06', id: 'Galeri Dokumentasi', jv: 'Pasarean Dokumèn', icon: 'photo_library' }
  ];

  function injectMobileNavStyles() {
    if (document.getElementById('mobile-nav-style-fix')) return;
    const style = document.createElement('style');
    style.id = 'mobile-nav-style-fix';
    style.textContent = `
      /* Fix Horizontal Overflow across all mobile screens */
      html, body {
        overflow-x: hidden !important;
        max-width: 100vw;
        width: 100%;
      }
      /* Ensure headers stay strictly inside viewport on mobile */
      header {
        max-width: 100vw !important;
        box-sizing: border-box !important;
      }
      /* Prevent offset frames from causing horizontal scrolling on screens <= 640px */
      @media (max-width: 640px) {
        div[class*="-right-3.5"],
        .javanese-frame-shadow > div.absolute.-top-3\\.5.-right-3\\.5 {
          display: none !important;
        }
        /* Responsive headings */
        h1 {
          font-size: clamp(1.4rem, 5.5vw, 2.25rem) !important;
          line-height: 1.25 !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
        }
        /* Compact header brand text on small screens */
        header .font-serif.text-lg {
          font-size: 0.92rem !important;
          letter-spacing: 0.04em !important;
        }
        header .text-\\[10px\\].tracking-widest {
          font-size: 8px !important;
          max-width: 135px !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
      }
      /* Touch-action optimization for 3D canvases */
      #threejs-canvas-mount canvas {
        touch-action: pan-y !important;
      }
    `;
    document.head.appendChild(style);
  }

  function injectMobileNavDrawer() {
    if (document.getElementById('mobile-nav-drawer')) return;

    // 1. Pastikan tombol hamburger ada di header
    let btnToggle = document.getElementById('btn-mobile-menu-toggle');
    if (!btnToggle) {
      const profileBtn = document.getElementById('btn-profile-modal');
      if (profileBtn && profileBtn.parentElement) {
        btnToggle = document.createElement('button');
        btnToggle.id = 'btn-mobile-menu-toggle';
        btnToggle.type = 'button';
        btnToggle.className = 'xl:hidden w-8 h-8 flex items-center justify-center bg-surface-container-low border border-outline-variant/60 text-primary hover:bg-surface-container transition-colors shadow-xs cursor-pointer ml-1 shrink-0';
        btnToggle.setAttribute('aria-label', 'Buka Menu Navigasi');
        btnToggle.setAttribute('title', 'Navigasi Menu Pameran');
        btnToggle.innerHTML = '<span class="material-symbols-outlined text-[20px]">menu</span>';
        profileBtn.parentElement.appendChild(btnToggle);
      }
    }

    // Tentukan halaman/bagian aktif saat ini
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    const isOnIndex = (currentFile === '' || currentFile === '/' || currentFile.toLowerCase().includes('index'));
    const initialSecIdx = window.kineticNav ? window.kineticNav.currentIndex : 0;

    const linksHtml = NAV_ITEMS.map(item => {
      const isCurrent = isOnIndex && (item.secIdx === initialSecIdx);
      
      const activeClass = isCurrent 
        ? 'bg-primary text-white font-bold shadow-xs' 
        : 'text-on-surface hover:bg-surface-container-high transition-colors font-medium';
      
      const badgeHtml = isCurrent 
        ? '<span class="drawer-active-badge ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">AKTIF</span>'
        : '<span class="drawer-active-badge hidden ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">AKTIF</span>';

      return `
        <a href="${item.href}" class="mobile-nav-link rounded-xl flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] uppercase tracking-wider ${activeClass} border border-outline-variant/20 transition-all" data-page="${item.href}" data-sec-idx="${item.secIdx}">
          <span class="drawer-nav-icon material-symbols-outlined text-[18px] ${isCurrent ? 'text-white' : 'text-primary'}">${item.icon}</span>
          <span class="mobile-nav-text font-mono">${item.num}. ${item.id}</span>
          ${badgeHtml}
        </a>
      `;
    }).join('');

    const drawerHtml = `
      <!-- Mobile Nav Backdrop -->
      <div id="mobile-nav-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 opacity-0 pointer-events-none" style="z-index: 9990;"></div>

      <!-- Mobile Nav Drawer -->
      <div id="mobile-nav-drawer" class="invisible pointer-events-none fixed top-0 right-0 bottom-0 w-[86vw] max-w-xs bg-surface border-l border-outline-variant/60 shadow-2xl transition-transform duration-300 translate-x-full flex flex-col justify-between overflow-y-auto overscroll-contain" style="z-index: 9995; -webkit-overflow-scrolling: touch;">
        
        <!-- Header Drawer -->
        <div class="p-4 border-b border-outline-variant/30 bg-surface-container-low flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-9 h-9 border border-primary-container/40 bg-surface-container flex items-center justify-center p-1 shadow-xs shrink-0">
              <img src="./logo-man2p.png" alt="Logo MAN 2 Ponorogo" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-serif text-sm font-bold text-on-surface uppercase tracking-wider truncate">BEJI SIRAH KETENG</span>
              <span id="drawer-subtitle" class="text-[9px] font-mono text-secondary font-bold uppercase truncate">Arsip Digital & Eksplorasi 3D</span>
            </div>
          </div>
          <button id="btn-close-mobile-nav" type="button" class="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0 ml-1 active:scale-95" aria-label="Tutup Menu">
            <span class="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <!-- Navigation Links Container -->
        <div class="p-4 flex flex-col gap-1.5 flex-1 overflow-y-auto">
          <div class="flex items-center justify-between pb-1.5 mb-1 border-b border-outline-variant/20">
            <span id="drawer-section-title" class="text-[10px] uppercase font-mono font-bold text-primary tracking-widest">
              MODUL PAMERAN (01 - 06)
            </span>
            <span class="text-[9px] font-mono text-outline">NAVIGASI</span>
          </div>

          <div class="flex flex-col gap-1.5">
            ${linksHtml}
          </div>

          <div class="my-3 border-t border-outline-variant/25"></div>

          <!-- Quick Actions -->
          <div class="flex flex-col gap-2">
            <!-- Tombol Masuk ke Lingkungan 3D Interaktif -->
            <a href="lingkungan-3d.html" id="drawer-btn-lingkungan-3d" class="w-full py-2.5 px-3 bg-gradient-to-r from-secondary/15 via-surface-container-low to-amber-500/10 hover:from-secondary/25 border border-secondary/40 text-on-surface text-[11px] font-semibold flex items-center justify-between transition-colors text-left shadow-xs cursor-pointer group">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-secondary text-[18px] group-hover:scale-110 transition-transform">explore</span>
                <span id="drawer-lingkungan-text">Jelajah Lingkungan 3D (Walkthrough)</span>
              </div>
              <span class="text-[9px] font-mono px-1.5 py-0.5 bg-secondary text-white uppercase tracking-wider font-bold shadow-xs rounded-[2px]">3D Virtual</span>
            </a>

            <button id="drawer-btn-audio-guide" type="button" class="btn-audio-guide w-full py-2.5 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 text-on-surface text-[11px] font-semibold flex items-center justify-between transition-colors text-left shadow-xs cursor-pointer">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-secondary text-[18px]">volume_up</span>
                <span id="drawer-audio-text">Pemandu Audio (3 Rekaman)</span>
              </div>
              <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" id="drawer-audio-dot"></span>
            </button>

            <button id="drawer-btn-credit" type="button" class="w-full py-2.5 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 text-on-surface text-[11px] font-semibold flex items-center gap-2.5 transition-colors text-left shadow-xs cursor-pointer">
              <span class="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              <span id="drawer-credit-text">Informasi Kredit & Peta Lokasi</span>
            </button>

            <a href="https://maps.app.goo.gl/hzqQeifrmbhTNcTr7" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 px-3 bg-primary text-white text-[11px] font-semibold flex items-center justify-between transition-colors shadow-xs cursor-pointer">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-[18px]">location_on</span>
                <span id="drawer-maps-text">Buka di Google Maps</span>
              </div>
              <span class="material-symbols-outlined text-[15px]">open_in_new</span>
            </a>
          </div>
        </div>

        <!-- Footer Drawer -->
        <div class="p-3.5 border-t border-outline-variant/30 bg-surface-container-low flex flex-col gap-1 text-[11px] text-on-surface-variant shrink-0">
          <div class="flex items-center justify-between font-mono text-[9px]">
            <span class="text-outline">Koordinat GPS:</span>
            <span class="text-primary font-bold">07°58'48" S 111°29'22" E</span>
          </div>
          <span id="drawer-footer-text" class="text-[10px] text-outline-variant font-mono">© 2026 MAN 2 Ponorogo • Tim Riset Mandiri</span>
        </div>

      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHtml);

    // Event handlers for Drawer
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const drawer = document.getElementById('mobile-nav-drawer');
    const btnClose = document.getElementById('btn-close-mobile-nav');
    const btnCredit = document.getElementById('drawer-btn-credit');

    function openDrawer() {
      if (!drawer || !backdrop) return;
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
      drawer.classList.remove('translate-x-full', 'invisible', 'pointer-events-none');
      drawer.classList.add('translate-x-0', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (!drawer || !backdrop) return;
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      drawer.classList.add('translate-x-full', 'pointer-events-none');
      drawer.classList.remove('translate-x-0', 'pointer-events-auto');
      setTimeout(() => {
        if (drawer && drawer.classList.contains('translate-x-full')) {
          drawer.classList.add('invisible');
        }
      }, 300);
      document.body.style.overflow = '';
    }

    // Toggle button handler (via delegation so it works on any button dynamically added)
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('#btn-mobile-menu-toggle');
      if (toggle) {
        e.preventDefault();
        openDrawer();
      }
    });

    btnClose?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('translate-x-0')) {
        closeDrawer();
      }
    });

    // Audio guide button in drawer opens audio options modal
    document.getElementById('drawer-btn-audio-guide')?.addEventListener('click', () => {
      closeDrawer();
      setTimeout(() => {
        openAudioOptionsModal();
      }, 250);
    });

    // Credit button in drawer opens the credit modal
    btnCredit?.addEventListener('click', () => {
      closeDrawer();
      setTimeout(() => {
        const creditModal = document.getElementById('credit-location-modal');
        const box = document.getElementById('credit-modal-box');
        if (creditModal) {
          creditModal.classList.remove('opacity-0', 'pointer-events-none');
          creditModal.classList.add('opacity-100', 'pointer-events-auto');
          if (box) {
            box.classList.remove('scale-95');
            box.classList.add('scale-100');
          }
          document.body.style.overflow = 'hidden';
        }
      }, 250);
    });

    function syncDrawerActiveSection(activeIdx) {
      drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
        const idx = parseInt(link.getAttribute('data-sec-idx'), 10);
        const isCurrent = (idx === activeIdx);
        const icon = link.querySelector('.drawer-nav-icon');
        const badge = link.querySelector('.drawer-active-badge');
        if (isCurrent) {
          link.classList.add('bg-primary', 'text-white', 'font-bold', 'shadow-xs');
          link.classList.remove('text-on-surface', 'hover:bg-surface-container-high', 'font-medium');
          if (icon) { icon.classList.add('text-white'); icon.classList.remove('text-primary'); }
          if (badge) badge.classList.remove('hidden');
        } else {
          link.classList.remove('bg-primary', 'text-white', 'font-bold', 'shadow-xs');
          link.classList.add('text-on-surface', 'hover:bg-surface-container-high', 'font-medium');
          if (icon) { icon.classList.remove('text-white'); icon.classList.add('text-primary'); }
          if (badge) badge.classList.add('hidden');
        }
      });
    }

    // Navigate smoothly via KineticNavigator on index.html or normal href on subpages
    drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const idx = parseInt(link.getAttribute('data-sec-idx'), 10);
        if (window.kineticNav && !Number.isNaN(idx)) {
          e.preventDefault();
          closeDrawer();
          window.kineticNav.goTo(idx);
          syncDrawerActiveSection(idx);
        } else {
          closeDrawer();
        }
      });
    });

    window.addEventListener('kinetic:sectionchange', (e) => {
      if (e && e.detail && typeof e.detail.index === 'number') {
        syncDrawerActiveSection(e.detail.index);
      }
    });

    updateMobileNavLanguage(window.BejiLang ? window.BejiLang.getCurrent() : 'id');
  }

  function updateMobileNavLanguage(lang) {
    const isJv = (lang === 'jv');
    const subtitle = document.getElementById('drawer-subtitle');
    const secTitle = document.getElementById('drawer-section-title');
    const creditText = document.getElementById('drawer-credit-text');
    const mapsText = document.getElementById('drawer-maps-text');
    const footerText = document.getElementById('drawer-footer-text');

    if (subtitle) subtitle.textContent = isJv ? 'Arsip Digital & Panyelidikan 3D' : 'Arsip Digital & Eksplorasi 3D';
    if (secTitle) secTitle.textContent = isJv ? 'MODHÈL PAMERAN (01 - 06)' : 'MODUL PAMERAN (01 - 06)';
    if (creditText) creditText.textContent = isJv ? 'Katrangan Kredit & Peta Papan' : 'Informasi Kredit & Peta Lokasi';
    if (mapsText) mapsText.textContent = isJv ? 'Bukak ing Google Maps' : 'Buka di Google Maps';
    if (footerText) footerText.textContent = isJv ? '© 2026 MAN 2 Ponorogo • Tim Panaliten Mandhiri' : '© 2026 MAN 2 Ponorogo • Tim Riset Mandiri';

    const drawerLingkunganText = document.getElementById('drawer-lingkungan-text');
    if (drawerLingkunganText) {
      drawerLingkunganText.textContent = isJv ? 'Jelajah Pasrawungan 3D (Walkthrough)' : 'Jelajah Lingkungan 3D (Walkthrough)';
    }
    const fabLingkunganText = document.getElementById('fab-lingkungan-text');
    if (fabLingkunganText) {
      fabLingkunganText.textContent = isJv ? 'Jelajah Pasrawungan 3D' : 'Jelajah Lingkungan 3D';
    }
    const headerLingkunganText = document.getElementById('header-lingkungan-text');
    if (headerLingkunganText) {
      headerLingkunganText.textContent = isJv ? 'Pasrawungan 3D' : 'Lingkungan 3D';
    }

    // Update nav links text
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const pageHref = link.getAttribute('data-page');
      const item = NAV_ITEMS.find(n => n.href === pageHref);
      const textSpan = link.querySelector('.mobile-nav-text');
      if (item && textSpan) {
        textSpan.textContent = `${item.num}. ${isJv ? item.jv : item.id}`;
      }
    });
  }

  // =========================================================================
  // INTEGRASI AKSES LINGKUNGAN VIRTUAL 3D (FAB & HEADER BUTTON)
  // =========================================================================
  function injectHeaderLingkunganBtn() {
    if (document.getElementById('header-btn-lingkungan-3d')) return;
    if (window.location.pathname.toLowerCase().endsWith('lingkungan-3d.html')) return;

    const audioBtn = document.getElementById('btn-audio-guide');
    if (!audioBtn) return;

    const isJv = (window.BejiLang ? window.BejiLang.getCurrent() : 'id') === 'jv';
    const html = `
      <a href="lingkungan-3d.html" id="header-btn-lingkungan-3d" class="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/45 hover:bg-primary hover:text-white text-primary border border-primary/25 transition-all text-[11px] font-mono font-semibold shadow-xs select-none cursor-pointer" title="Jelajahi Rekonstruksi Lingkungan Virtual 3D Beji Sirah Keteng (Mode Jalan Kaki & Drone Orbit)">
        <span class="material-symbols-outlined text-[15px]">explore</span>
        <span id="header-lingkungan-text">${isJv ? 'Pasrawungan 3D' : 'Lingkungan 3D'}</span>
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
      </a>
    `;
    audioBtn.insertAdjacentHTML('beforebegin', html);
  }

  function injectLingkunganFab() {
    if (document.getElementById('fab-lingkungan-3d')) return;
    if (window.location.pathname.toLowerCase().endsWith('lingkungan-3d.html')) return;

    const hasKineticBar = !!document.getElementById('bottom-kinetic-bar');
    const bottomCls = hasKineticBar ? 'bottom-16 md:bottom-3.5' : 'bottom-4 sm:bottom-6';
    const isJv = (window.BejiLang ? window.BejiLang.getCurrent() : 'id') === 'jv';
    const fabHtml = `
      <!-- Floating Action Button: Jelajah Lingkungan 3D -->
      <a href="lingkungan-3d.html" id="fab-lingkungan-3d" class="fixed left-3.5 ${bottomCls} sm:left-6 z-[9960] flex items-center gap-2 sm:gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-primary to-primary-container text-white rounded-full shadow-[0_6px_22px_rgba(54,72,37,0.34)] hover:shadow-[0_10px_28px_rgba(54,72,37,0.48)] border border-white/25 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer select-none" style="transition: bottom 0.3s ease, transform 0.2s ease;" title="Jelajahi Rekonstruksi Lingkungan Virtual 3D Beji Sirah Keteng (Mode Orang Pertama & Drone Orbit)">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
        </span>
        <span class="material-symbols-outlined text-[18px] sm:text-[19px] text-secondary-container group-hover:rotate-12 transition-transform">explore</span>
        <span id="fab-lingkungan-text" class="text-[11px] sm:text-xs font-serif font-bold tracking-wide">${isJv ? 'Jelajah Pasrawungan 3D' : 'Jelajah Lingkungan 3D'}</span>
        <span class="hidden lg:inline text-[9px] font-mono uppercase px-1.5 py-0.5 bg-white/20 rounded-full font-semibold">Walkthrough</span>
      </a>
    `;
    document.body.insertAdjacentHTML('beforeend', fabHtml);
  }

  function updateFabPosition() {
    const fab = document.getElementById('fab-lingkungan-3d');
    const player = document.getElementById('beji-audio-player');
    const hasKineticBar = !!document.getElementById('bottom-kinetic-bar');
    if (!fab) return;
    if (player && !player.classList.contains('hidden')) {
      const isMobile = window.innerWidth < 768;
      fab.style.bottom = (hasKineticBar && isMobile) ? 'calc(118px + 0.5rem)' : 'calc(72px + 0.75rem)';
    } else {
      fab.style.bottom = '';
    }
  }

  // =========================================================================
  // SISTEM AUDIO GANDA: WAWANCARA SEJARAH & TEMBANG TRADISIONAL SITUS BEJI
  // DILENGKAPI VISUALISASI AURA DI SELURUH HALAMAN SAAT TEMBANG MENGALUN
  // =========================================================================

  // 1. Data Playlist Wawancara (3 Rekaman Dokumenter Lapangan)
  const WAWANCARA_PLAYLIST = [
    {
      id: 1,
      num: '01',
      titleId: 'Pemandu Audio 1: Rekaman Lapangan & Tutur Lisan',
      titleJv: 'Pemandu Audio 1: Rekaman Lapangan & Tutur Sejarah Lisan',
      speakerId: 'Arsip Lapangan MAN 2 Ponorogo • Rekaman Lisan (24:03)',
      speakerJv: 'Arsip Lapangan MAN 2 Ponorogo • Rekaman Lisan (24:03)',
      durationStr: '24:03',
      src: './dokumentasi/audio/22%20Sept%2C%203.04%20pm_.aac'
    },
    {
      id: 2,
      num: '02',
      titleId: 'Pemandu Audio 2: Wawancara Narasumber Sesepuh Desa',
      titleJv: 'Pemandu Audio 2: Rembagan Kaliyan Sesepuh Dhusun',
      speakerId: 'Pak Jarno (Kamituwa / Purna Pamong Bedingin 2024) (10:20)',
      speakerJv: 'Pak Jarno (Kamituwa / Purna Pamong Bedingin 2024) (10:20)',
      durationStr: '10:20',
      src: './dokumentasi/audio/WhatsApp%20Audio%202026-10-15%20at%207.22.37%20AM.aac'
    },
    {
      id: 3,
      num: '03',
      titleId: 'Pemandu Audio 3: Analisis Sejarah & Verifikasi Petirtaan',
      titleJv: 'Pemandu Audio 3: Panaliten Sejarah & Kasunyatan Sendang',
      speakerId: 'Tim Peneliti Siswa MAN 2 Ponorogo • Arkeologi (07:02)',
      speakerJv: 'Tim Panaliten Siswa MAN 2 Ponorogo • Arkeologi (07:02)',
      durationStr: '07:02',
      src: './dokumentasi/audio/WhatsApp%20Audio%202026-10-15%20at%209.11.05%20AM.mp3'
    }
  ];

  // 2. Data Track Tembang Tradisional Situs Beji
  const TEMBANG_TRACK = {
    id: 'tembang-beji',
    num: '01',
    titleId: 'Tembang Tradisional: Kidung Pasucian Beji Sirah Keteng',
    titleJv: 'Tembang Tradisional: Kidung Pasucian Beji Sirah Keteng',
    speakerId: 'Seni Karawitan & Lantunan Tradisional • Sambit, Ponorogo (02:54)',
    speakerJv: 'Kesenian Karawitan & Kidung Pasucian • Sambit, Ponorogo (02:54)',
    durationStr: '02:54',
    src: './Situs_Beji.mp4'
  };

  // State Management
  let currentChannel = 'wawancara'; // 'wawancara' | 'tembang'
  let currentWawancaraIndex = 0;
  let isAudioPlaying = false;
  let audioInstance = null;
  let audioEventsBound = false;

  // Aura Visualization State
  let isAuraActive = false;
  let auraAnimFrameId = null;
  let auraParticles = [];
  let auraRippleRadius = 0;
  let webAudioCtx = null;
  let webAudioAnalyser = null;
  let webAudioSourceNode = null;

  function formatAudioTime(secs) {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // =========================================================================
  // STYLES INJECTION UNTUK AURA & AUDIO OPTIONS
  // =========================================================================
  function injectAudioStyles() {
    if (document.getElementById('beji-audio-aura-styles')) return;
    const style = document.createElement('style');
    style.id = 'beji-audio-aura-styles';
    style.textContent = `
      /* Pendaran Vignette Aura Pinggiran Layar */
      @keyframes tembangVignettePulse {
        0% {
          box-shadow: inset 0 0 70px 20px rgba(245, 158, 11, 0.20), inset 0 0 35px 12px rgba(20, 184, 166, 0.15);
        }
        50% {
          box-shadow: inset 0 0 120px 45px rgba(245, 158, 11, 0.32), inset 0 0 65px 25px rgba(20, 184, 166, 0.24);
        }
        100% {
          box-shadow: inset 0 0 85px 28px rgba(251, 191, 36, 0.24), inset 0 0 45px 16px rgba(45, 212, 191, 0.18);
        }
      }
      .tembang-vignette-active {
        animation: tembangVignettePulse 4.5s ease-in-out infinite alternate !important;
      }

      /* Equalizer Sound Waves Animation */
      @keyframes eqBarPulse {
        0%, 100% { height: 3px; }
        50% { height: 13px; }
      }
      .animate-eq-1 { animation: eqBarPulse 0.85s ease-in-out infinite; }
      .animate-eq-2 { animation: eqBarPulse 0.65s ease-in-out infinite 0.18s; }
      .animate-eq-3 { animation: eqBarPulse 0.95s ease-in-out infinite 0.35s; }

      /* Glowing border untuk opsi tembang */
      .golden-aura-glow {
        box-shadow: 0 0 16px rgba(245, 158, 11, 0.35);
      }
    `;
    document.head.appendChild(style);
  }

  // =========================================================================
  // SISTEM VISUALISASI AURA SELURUH HALAMAN (CANVAS + VIGNETTE + AUDIO ANALYSER)
  // =========================================================================
  function initTembangAura() {
    injectAudioStyles();
    if (document.getElementById('tembang-aura-container')) return;

    const auraHtml = `
      <!-- Full-Page Ethereal Aura Overlay -->
      <div id="tembang-aura-container" class="fixed inset-0 pointer-events-none opacity-0 transition-opacity duration-1000 z-[9970] overflow-hidden" aria-hidden="true">
        <div id="tembang-aura-vignette" class="absolute inset-0 pointer-events-none"></div>
        <canvas id="tembang-aura-canvas" class="w-full h-full block pointer-events-none"></canvas>
      </div>

      <!-- Floating Pill Status Aura Tembang -->
      <div id="tembang-aura-indicator" class="hidden fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-[9975] items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/95 backdrop-blur-md border border-amber-500/50 shadow-[0_4px_16px_rgba(245,158,11,0.25)] text-on-surface text-[10.5px] font-mono select-none pointer-events-auto cursor-pointer transition-all hover:scale-105" title="Visualisasi Aura Tembang Aktif (Klik untuk buka opsi)">
        <div class="flex items-center gap-0.5 h-3">
          <span class="w-0.5 bg-amber-500 rounded-full animate-eq-1"></span>
          <span class="w-0.5 bg-amber-400 rounded-full animate-eq-2"></span>
          <span class="w-0.5 bg-amber-600 rounded-full animate-eq-3"></span>
        </div>
        <span class="material-symbols-outlined text-amber-500 text-[14px]">auto_awesome</span>
        <span id="aura-pill-title" class="font-serif font-bold text-amber-800 dark:text-amber-200">Aura Tembang Beji</span>
        <span id="aura-pill-badge" class="text-[9px] uppercase px-1 py-0.2 bg-amber-500/20 text-amber-900 dark:text-amber-100 border border-amber-500/30 rounded-[2px]">Aktif ✨</span>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', auraHtml);

    // Klik floating pill membuka modal opsi audio
    document.getElementById('tembang-aura-indicator')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openAudioOptionsModal();
    });

    // Inisialisasi partikel aura
    const particleCount = window.innerWidth < 640 ? 35 : 65;
    auraParticles = [];
    const colors = [
      { r: 251, g: 191, b: 36 },  // Golden amber
      { r: 245, g: 158, b: 11 },  // Sacred gold
      { r: 45, g: 212, b: 191 },  // Spring water turquoise
      { r: 20, g: 184, b: 166 },  // Deep petirtaan teal
      { r: 254, g: 240, b: 138 }  // Lotus starlight gold
    ];

    for (let i = 0; i < particleCount; i++) {
      auraParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 1.8 + Math.random() * 4.2,
        halo: 14 + Math.random() * 26,
        speedY: 0.28 + Math.random() * 0.72,
        swayAmp: 10 + Math.random() * 24,
        swaySpeed: 0.01 + Math.random() * 0.02,
        angle: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.032,
        pulseAngle: Math.random() * Math.PI * 2,
        baseAlpha: 0.35 + Math.random() * 0.45,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    window.addEventListener('resize', resizeAuraCanvas);
    resizeAuraCanvas();
  }

  function resizeAuraCanvas() {
    const canvas = document.getElementById('tembang-aura-canvas');
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
  }

  function startTembangAura() {
    initTembangAura();
    isAuraActive = true;
    const container = document.getElementById('tembang-aura-container');
    const vignette = document.getElementById('tembang-aura-vignette');
    const indicator = document.getElementById('tembang-aura-indicator');

    if (container) {
      container.classList.remove('opacity-0');
      container.classList.add('opacity-100');
    }
    if (vignette) {
      vignette.classList.add('tembang-vignette-active');
    }
    if (indicator) {
      indicator.classList.remove('hidden');
      indicator.classList.add('flex');
    }

    // Setup Web Audio analyser (dengan penanganan aman)
    if (!webAudioCtx && (window.AudioContext || window.webkitAudioContext) && audioInstance) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        webAudioCtx = new AudioCtx();
        webAudioAnalyser = webAudioCtx.createAnalyser();
        webAudioAnalyser.fftSize = 64;
        webAudioSourceNode = webAudioCtx.createMediaElementSource(audioInstance);
        webAudioSourceNode.connect(webAudioAnalyser);
        webAudioAnalyser.connect(webAudioCtx.destination);
      } catch (err) {
        // Fallback ke LFO harmonis jika routing media element dibatasi browser
      }
    }
    if (webAudioCtx && webAudioCtx.state === 'suspended') {
      webAudioCtx.resume().catch(() => {});
    }

    if (!auraAnimFrameId) {
      runAuraLoop();
    }
  }

  function stopTembangAura(smooth = true) {
    const container = document.getElementById('tembang-aura-container');
    const vignette = document.getElementById('tembang-aura-vignette');
    const indicator = document.getElementById('tembang-aura-indicator');

    if (container) {
      container.classList.remove('opacity-100');
      container.classList.add('opacity-0');
    }
    if (vignette) {
      vignette.classList.remove('tembang-vignette-active');
    }
    if (indicator) {
      indicator.classList.remove('flex');
      indicator.classList.add('hidden');
    }

    if (!smooth) {
      isAuraActive = false;
      if (auraAnimFrameId) {
        cancelAnimationFrame(auraAnimFrameId);
        auraAnimFrameId = null;
      }
    } else {
      setTimeout(() => {
        if (!isAuraActive) {
          if (auraAnimFrameId) {
            cancelAnimationFrame(auraAnimFrameId);
            auraAnimFrameId = null;
          }
        }
      }, 1100);
      isAuraActive = false;
    }
  }

  function runAuraLoop() {
    if (!isAuraActive) {
      auraAnimFrameId = null;
      return;
    }

    const canvas = document.getElementById('tembang-aura-canvas');
    if (!canvas) {
      auraAnimFrameId = null;
      return;
    }

    const ctx = canvas.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Ekstraksi boost frekuensi audio real-time
    let audioBoost = 0;
    if (webAudioAnalyser && isAudioPlaying) {
      try {
        const freqData = new Uint8Array(webAudioAnalyser.frequencyBinCount);
        webAudioAnalyser.getByteFrequencyData(freqData);
        let sum = 0;
        const count = Math.min(16, freqData.length);
        for (let i = 0; i < count; i++) sum += freqData[i];
        audioBoost = (sum / count) / 255;
      } catch (e) {
        audioBoost = 0;
      }
    }
    if (audioBoost <= 0.02) {
      // Fallback LFO harmonis alami berbasis tempo gamelan Beji (~72 BPM)
      const time = performance.now() * 0.0022;
      audioBoost = 0.22 + 0.18 * Math.sin(time) + 0.12 * Math.sin(time * 1.6);
    }

    // Riak gelombang konsentris emas meluas perlahan dari bawah
    auraRippleRadius = (auraRippleRadius + 0.65 + audioBoost * 1.5);
    const maxRipple = Math.max(w, h) * 0.75;
    if (auraRippleRadius > maxRipple) auraRippleRadius = 0;

    const rippleAlpha = Math.max(0, 0.18 * (1 - auraRippleRadius / maxRipple) * (0.5 + audioBoost * 0.5));
    if (rippleAlpha > 0.005) {
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.75, auraRippleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245, 158, 11, ${rippleAlpha})`;
      ctx.lineWidth = 1.5 + audioBoost * 2;
      ctx.stroke();

      const secRadius = (auraRippleRadius + maxRipple * 0.5) % maxRipple;
      const secAlpha = Math.max(0, 0.12 * (1 - secRadius / maxRipple) * (0.5 + audioBoost * 0.5));
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.75, secRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(45, 212, 191, ${secAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // Render & animasi setiap partikel aura
    for (let i = 0; i < auraParticles.length; i++) {
      const p = auraParticles[i];
      p.angle += p.swaySpeed;
      p.pulseAngle += p.pulseSpeed;
      p.x += Math.sin(p.angle) * (0.4 + audioBoost * 0.6);
      p.y -= (p.speedY + audioBoost * 0.55);

      if (p.y < -p.halo) {
        p.y = h + p.halo;
        p.x = Math.random() * w;
      }
      if (p.x < -p.halo) p.x = w + p.halo;
      if (p.x > w + p.halo) p.x = -p.halo;

      const alphaPulse = Math.sin(p.pulseAngle) * 0.22;
      const curAlpha = Math.min(1, Math.max(0.1, (p.baseAlpha + alphaPulse) * (0.7 + audioBoost * 0.6)));
      const curHalo = p.halo * (1 + audioBoost * 0.45);
      const curRadius = p.radius * (1 + audioBoost * 0.35);

      // Radial halo gradient
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, curHalo);
      grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${curAlpha * 0.9})`);
      grad.addColorStop(0.35, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${curAlpha * 0.4})`);
      grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, curHalo, 0, Math.PI * 2);
      ctx.fill();

      // Inti cahaya putih berkilau
      ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, curRadius * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    auraAnimFrameId = requestAnimationFrame(runAuraLoop);
  }

  // =========================================================================
  // MODAL / POPOVER PILIHAN AUDIO (WAWANCARA VS TEMBANG)
  // =========================================================================
  function injectAudioOptionsModal() {
    injectAudioStyles();
    if (document.getElementById('audio-options-modal')) return;

    const modalHtml = `
      <!-- Backdrop Gelap Lembut -->
      <div id="audio-options-backdrop" class="fixed inset-0 bg-black/45 backdrop-blur-xs z-[9990] opacity-0 pointer-events-none transition-opacity duration-200"></div>

      <!-- Kotak Dialog Pilihan Audio -->
      <div id="audio-options-modal" class="fixed inset-x-3 top-16 sm:inset-x-auto sm:top-20 sm:right-6 md:right-16 lg:right-24 max-w-[420px] w-[calc(100vw-24px)] sm:w-[420px] bg-surface/98 backdrop-blur-md border border-outline-variant/70 shadow-[0_20px_50px_rgba(15,23,42,0.18)] z-[9995] rounded-2xl p-4 sm:p-5 opacity-0 scale-95 pointer-events-none transition-all duration-200 text-on-surface" style="transform-origin: top right;">
        
        <!-- Header Popover -->
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-outline-variant/30">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 bg-secondary"></span>
            <h3 id="audio-options-title" class="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-on-surface">
              PILIHAN PEMANDU AUDIO
            </h3>
          </div>
          <button id="btn-close-audio-options" type="button" class="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer" aria-label="Tutup Pilihan Audio">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p id="audio-options-desc" class="text-[11px] text-on-surface-variant leading-relaxed mb-3">
          Silakan pilih sajian rekaman audio sejarah tutur lisan atau lantunan tembang tradisional Beji Sirah Keteng:
        </p>

        <!-- Daftar Opsi -->
        <div class="flex flex-col gap-2.5">
          
          <!-- Opsi 1: Audio Wawancara (3 Rekaman Dokumenter) -->
          <div id="opt-channel-wawancara" class="group relative p-3 sm:p-3.5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 hover:border-secondary transition-all cursor-pointer shadow-xs">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full bg-secondary/15 border border-secondary/40 text-secondary flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform" id="opt-icon-container-wawancara">
                <span class="material-symbols-outlined text-[20px]" id="opt-icon-wawancara">record_voice_over</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1 mb-1">
                  <span id="opt-title-wawancara" class="font-serif text-[13px] font-bold text-on-surface group-hover:text-primary transition-colors">
                    Audio Wawancara & Tutur Sejarah
                  </span>
                  <span id="opt-badge-wawancara" class="px-1.5 py-0.5 bg-secondary/10 text-secondary border border-secondary/25 text-[9px] font-mono font-bold uppercase shrink-0">
                    3 Rekaman
                  </span>
                </div>
                <p id="opt-desc-wawancara" class="text-[10.5px] text-on-surface-variant leading-normal mb-2">
                  Rekaman tutur lisan sesepuh desa (Kamituwa Pak Jarno) & verifikasi arkeologi petirtaan Beji Sirah Keteng (Total 41:25).
                </p>
                <div class="flex items-center justify-between text-[10px] font-mono">
                  <span class="text-outline flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">schedule</span>
                    <span id="opt-duration-wawancara">41:25 • Berurutan</span>
                  </span>
                  <div id="opt-status-wawancara" class="flex items-center gap-1 font-bold text-primary group-hover:underline">
                    <span class="material-symbols-outlined text-[15px]" id="opt-action-icon-wawancara">play_circle</span>
                    <span id="opt-action-text-wawancara">Putar Wawancara</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Opsi 2: Tembang Tradisional Situs Beji (dengan Visualisasi Aura) -->
          <div id="opt-channel-tembang" class="group relative p-3 sm:p-3.5 bg-gradient-to-br from-secondary/5 via-surface-container-low to-amber-500/10 hover:to-amber-500/20 border border-amber-500/40 hover:border-amber-500 transition-all cursor-pointer shadow-xs">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs" id="opt-icon-container-tembang">
                <span class="material-symbols-outlined text-[20px]" id="opt-icon-tembang">auto_awesome</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1 mb-1">
                  <span id="opt-title-tembang" class="font-serif text-[13px] font-bold text-on-surface group-hover:text-amber-700 transition-colors">
                    Tembang Tradisional Situs Beji
                  </span>
                  <span id="opt-badge-tembang" class="px-1.5 py-0.5 bg-amber-500/15 text-amber-700 border border-amber-500/30 text-[9px] font-mono font-bold uppercase shrink-0 flex items-center gap-0.5">
                    <span>Aura</span>
                    <span class="material-symbols-outlined text-[10px]">sparkles</span>
                  </span>
                </div>
                <p id="opt-desc-tembang" class="text-[10.5px] text-on-surface-variant leading-normal mb-2">
                  Lantunan kidung sakral laras Beji Sirah Keteng disertai pendaran visualisasi aura di seluruh layar (02:54).
                </p>
                <div class="flex items-center justify-between text-[10px] font-mono">
                  <span class="text-outline flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">auto_awesome</span>
                    <span id="opt-duration-tembang">02:54 • Visual Aura</span>
                  </span>
                  <div id="opt-status-tembang" class="flex items-center gap-1 font-bold text-amber-700 group-hover:underline">
                    <span class="material-symbols-outlined text-[15px]" id="opt-action-icon-tembang">play_circle</span>
                    <span id="opt-action-text-tembang">Putar Tembang & Visualisasi ✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Quick Status Bar (Muncul saat audio aktif berputar) -->
        <div id="audio-options-active-bar" class="hidden mt-3 pt-2.5 border-t border-outline-variant/30 flex items-center justify-between text-[11px] font-mono bg-surface-container-low px-2.5 py-1.5">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0"></span>
            <span id="audio-options-active-info" class="truncate text-on-surface font-semibold text-[10px]">
              Sedang diputar...
            </span>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button id="btn-options-quick-toggle" type="button" class="px-2 py-0.5 bg-primary text-white rounded-[2px] text-[10px] font-bold flex items-center gap-0.5 hover:bg-primary-container transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-[13px]" id="icon-options-quick-toggle">pause</span>
              <span id="text-options-quick-toggle">Jeda</span>
            </button>
            <button id="btn-options-quick-stop" type="button" class="px-2 py-0.5 bg-surface-container hover:bg-error hover:text-white border border-outline-variant/40 rounded-[2px] text-[10px] font-bold transition-colors cursor-pointer" title="Hentikan Audio">
              Hentikan
            </button>
          </div>
        </div>

      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Event listeners
    document.getElementById('btn-close-audio-options')?.addEventListener('click', closeAudioOptionsModal);
    document.getElementById('audio-options-backdrop')?.addEventListener('click', closeAudioOptionsModal);

    document.getElementById('opt-channel-wawancara')?.addEventListener('click', () => {
      handleSelectWawancara();
      closeAudioOptionsModal();
    });

    document.getElementById('opt-channel-tembang')?.addEventListener('click', () => {
      handleSelectTembang();
      closeAudioOptionsModal();
    });

    document.getElementById('btn-options-quick-toggle')?.addEventListener('click', () => {
      toggleAudioPlayback();
      updateAudioOptionsModalUI();
    });

    document.getElementById('btn-options-quick-stop')?.addEventListener('click', () => {
      stopAndClosePlayer();
      closeAudioOptionsModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('audio-options-modal');
        if (modal && !modal.classList.contains('pointer-events-none')) {
          closeAudioOptionsModal();
        }
      }
    });

    updateAudioOptionsModalUI();
  }

  function openAudioOptionsModal() {
    injectAudioOptionsModal();
    const modal = document.getElementById('audio-options-modal');
    const backdrop = document.getElementById('audio-options-backdrop');
    if (!modal || !backdrop) return;

    updateAudioOptionsModalUI();

    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');

    modal.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
    modal.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
  }

  function closeAudioOptionsModal() {
    const modal = document.getElementById('audio-options-modal');
    const backdrop = document.getElementById('audio-options-backdrop');
    if (!modal || !backdrop) return;

    backdrop.classList.add('opacity-0', 'pointer-events-none');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');

    modal.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
  }

  function updateAudioOptionsModalUI() {
    const isJv = (window.BejiLang ? window.BejiLang.getCurrent() : 'id') === 'jv';

    const titleEl = document.getElementById('audio-options-title');
    const descEl = document.getElementById('audio-options-desc');
    const titleWawancara = document.getElementById('opt-title-wawancara');
    const descWawancara = document.getElementById('opt-desc-wawancara');
    const actionTextWawancara = document.getElementById('opt-action-text-wawancara');
    const actionIconWawancara = document.getElementById('opt-action-icon-wawancara');
    const cardWawancara = document.getElementById('opt-channel-wawancara');

    const titleTembang = document.getElementById('opt-title-tembang');
    const descTembang = document.getElementById('opt-desc-tembang');
    const actionTextTembang = document.getElementById('opt-action-text-tembang');
    const actionIconTembang = document.getElementById('opt-action-icon-tembang');
    const cardTembang = document.getElementById('opt-channel-tembang');

    const activeBar = document.getElementById('audio-options-active-bar');
    const activeInfo = document.getElementById('audio-options-active-info');
    const quickToggleIcon = document.getElementById('icon-options-quick-toggle');
    const quickToggleText = document.getElementById('text-options-quick-toggle');

    if (titleEl) titleEl.textContent = isJv ? 'PILIHAN PAMIRENG AUDIO' : 'PILIHAN PEMANDU AUDIO';
    if (descEl) descEl.textContent = isJv 
      ? 'Mangga pilih pamireng rekaman sejarah tutur lisan utawi laras kidung luhur Beji Sirah Keteng:' 
      : 'Silakan pilih sajian rekaman audio sejarah tutur lisan atau lantunan tembang tradisional Beji Sirah Keteng:';

    if (titleWawancara) titleWawancara.textContent = isJv ? 'Audio Rembagan & Tutur Sejarah' : 'Audio Wawancara & Tutur Sejarah';
    if (descWawancara) descWawancara.textContent = isJv
      ? 'Rekaman tutur lisan sesepuh dhusun (Kamituwa Pak Jarno) & panaliten sejarah Beji Sirah Keteng (Total 41:25).'
      : 'Rekaman tutur lisan sesepuh desa (Kamituwa Pak Jarno) & verifikasi arkeologi petirtaan Beji Sirah Keteng (Total 41:25).';

    if (titleTembang) titleTembang.textContent = isJv ? 'Tembang Tradisional Situs Beji' : 'Tembang Tradisional Situs Beji';
    if (descTembang) descTembang.textContent = isJv
      ? 'Laras kidung luhur Beji Sirah Keteng kanthi daya pepadhang aura ing salumahing layar (02:54).'
      : 'Lantunan kidung sakral laras Beji Sirah Keteng disertai pendaran visualisasi aura di seluruh layar (02:54).';

    // Status kartu wawancara
    if (currentChannel === 'wawancara' && isAudioPlaying) {
      if (actionTextWawancara) actionTextWawancara.textContent = isJv ? 'Nembe Muter (Jeda)' : 'Sedang Diputar (Jeda)';
      if (actionIconWawancara) actionIconWawancara.textContent = 'pause_circle';
      if (cardWawancara) cardWawancara.classList.add('border-secondary', 'bg-surface-container');
    } else if (currentChannel === 'wawancara' && !isAudioPlaying && audioInstance && audioInstance.currentTime > 0) {
      if (actionTextWawancara) actionTextWawancara.textContent = isJv ? 'Nglajengaken Rembagan' : 'Lanjutkan Wawancara';
      if (actionIconWawancara) actionIconWawancara.textContent = 'play_circle';
      if (cardWawancara) cardWawancara.classList.remove('border-secondary', 'bg-surface-container');
    } else {
      if (actionTextWawancara) actionTextWawancara.textContent = isJv ? 'Muter Rembagan' : 'Putar Wawancara';
      if (actionIconWawancara) actionIconWawancara.textContent = 'play_circle';
      if (cardWawancara) cardWawancara.classList.remove('border-secondary', 'bg-surface-container');
    }

    // Status kartu tembang
    if (currentChannel === 'tembang' && isAudioPlaying) {
      if (actionTextTembang) actionTextTembang.textContent = isJv ? 'Nembe Nglaras (Jeda)' : 'Sedang Mengalun (Jeda)';
      if (actionIconTembang) actionIconTembang.textContent = 'pause_circle';
      if (cardTembang) cardTembang.classList.add('border-amber-500', 'bg-amber-500/15', 'golden-aura-glow');
    } else if (currentChannel === 'tembang' && !isAudioPlaying && audioInstance && audioInstance.currentTime > 0) {
      if (actionTextTembang) actionTextTembang.textContent = isJv ? 'Nglajengaken Tembang' : 'Lanjutkan Tembang';
      if (actionIconTembang) actionIconTembang.textContent = 'play_circle';
      if (cardTembang) cardTembang.classList.remove('border-amber-500', 'bg-amber-500/15', 'golden-aura-glow');
    } else {
      if (actionTextTembang) actionTextTembang.textContent = isJv ? 'Muter Tembang & Pepadhang ✨' : 'Putar Tembang & Visualisasi ✨';
      if (actionIconTembang) actionIconTembang.textContent = 'play_circle';
      if (cardTembang) cardTembang.classList.remove('border-amber-500', 'bg-amber-500/15', 'golden-aura-glow');
    }

    // Active Bar update
    if (activeBar && isAudioPlaying) {
      activeBar.classList.remove('hidden');
      if (activeInfo) {
        if (currentChannel === 'tembang') {
          activeInfo.textContent = isJv ? '🎶 Kidung Beji (Aura Murub)' : '🎶 Tembang Beji (Aura Aktif ✨)';
        } else {
          activeInfo.textContent = isJv 
            ? `🎙️ Rembagan Bagian ${currentWawancaraIndex + 1}/3` 
            : `🎙️ Wawancara Bagian ${currentWawancaraIndex + 1}/3`;
        }
      }
      if (quickToggleIcon) quickToggleIcon.textContent = 'pause';
      if (quickToggleText) quickToggleText.textContent = isJv ? 'Kendel' : 'Jeda';
    } else if (activeBar && !isAudioPlaying && audioInstance && audioInstance.currentTime > 0) {
      activeBar.classList.remove('hidden');
      if (activeInfo) {
        activeInfo.textContent = isJv ? 'Audio Kendel (Dijeda)' : 'Audio Dijeda';
      }
      if (quickToggleIcon) quickToggleIcon.textContent = 'play_arrow';
      if (quickToggleText) quickToggleText.textContent = isJv ? 'Lajeng' : 'Lanjut';
    } else if (activeBar) {
      activeBar.classList.add('hidden');
    }

    // Pill language
    const pillTitle = document.getElementById('aura-pill-title');
    const pillBadge = document.getElementById('aura-pill-badge');
    if (pillTitle) pillTitle.textContent = isJv ? 'Aura Kidung Beji' : 'Aura Tembang Beji';
    if (pillBadge) pillBadge.textContent = isJv ? 'Murub ✨' : 'Aktif ✨';
  }

  function handleSelectWawancara() {
    if (currentChannel === 'wawancara' && isAudioPlaying) {
      toggleAudioPlayback();
    } else {
      playWawancaraChannel(currentWawancaraIndex, true);
    }
    updateAudioOptionsModalUI();
  }

  function handleSelectTembang() {
    if (currentChannel === 'tembang' && isAudioPlaying) {
      toggleAudioPlayback();
    } else {
      playTembangChannel(true);
    }
    updateAudioOptionsModalUI();
  }

  // =========================================================================
  // PEMUTAR AUDIO FLOATING DOCK (BEJI AUDIO PLAYER)
  // =========================================================================
  function injectAudioPlayer() {
    if (document.getElementById('beji-audio-player')) return;

    const playerHtml = `
      <!-- Beji Audio Player Floating Dock -->
      <div id="beji-audio-player" class="hidden fixed bottom-0 inset-x-0 bg-surface/96 backdrop-blur-md border-t border-outline-variant/60 shadow-[0_-6px_25px_rgba(43,38,35,0.15)] select-none transition-all duration-300" style="z-index: 9980;">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 flex flex-col gap-1.5">
          
          <!-- Scrubber / Progress Bar Row -->
          <div class="flex items-center gap-2.5 text-[10px] font-mono text-on-surface-variant">
            <span id="player-time-current" class="w-10 text-right">00:00</span>
            <div id="player-progress-container" class="relative flex-1 h-2 bg-surface-container-high rounded-full cursor-pointer group py-0.5">
              <div id="player-progress-bar" class="h-full bg-secondary rounded-full relative transition-all duration-75" style="width: 0%;">
                <span class="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-secondary border-2 border-white rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </div>
            </div>
            <span id="player-time-duration" class="w-10 text-left">--:--</span>
          </div>

          <!-- Controls & Track Info Row -->
          <div class="flex items-center justify-between gap-3">
            
            <!-- Track Meta -->
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <div class="w-9 h-9 rounded-full bg-secondary/15 border border-secondary/40 text-secondary flex items-center justify-center shrink-0 shadow-xs" id="player-disc-container">
                <span class="material-symbols-outlined text-[20px]" id="player-disc-icon">graphic_eq</span>
              </div>
              <div class="flex flex-col min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span id="player-track-badge" class="px-1.5 py-0.5 bg-secondary text-white text-[9px] font-mono font-bold uppercase tracking-wider shrink-0">
                    BAGIAN 1 DARI 3
                  </span>
                  <span id="player-auto-badge" class="text-[9px] font-mono text-primary font-bold uppercase hidden sm:inline">
                    PUTAR OTOMATIS BERURUTAN
                  </span>
                </div>
                <span id="player-track-title" class="font-serif text-[12px] sm:text-[13px] font-bold text-on-surface truncate leading-tight mt-0.5">
                  Pemandu Audio 1: Rekaman Lapangan & Tutur Lisan
                </span>
                <span id="player-track-speaker" class="text-[10px] text-on-surface-variant font-mono truncate">
                  Arsip Lapangan MAN 2 Ponorogo • Rekaman Lisan (24:03)
                </span>
              </div>
            </div>

            <!-- Quick Channel Switcher Buttons in Dock -->
            <div class="hidden md:flex items-center gap-1 border border-outline-variant/40 bg-surface-container-low p-0.5 rounded-[3px] shrink-0 text-[10px] font-mono">
              <button id="dock-btn-wawancara" type="button" class="px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer font-bold bg-secondary text-white shadow-xs" title="Beralih ke Rekaman Wawancara (3 Bagian)">
                🎙️ Wawancara
              </button>
              <button id="dock-btn-tembang" type="button" class="px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer font-bold text-on-surface-variant hover:text-on-surface" title="Beralih ke Tembang Situs Beji dengan Aura">
                🎶 Tembang ✨
              </button>
            </div>

            <!-- Action Buttons: Prev, Play/Pause, Next, Options, Close -->
            <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button id="player-btn-prev" type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer" title="Sebelumnya" aria-label="Sebelumnya">
                <span class="material-symbols-outlined text-[20px]">skip_previous</span>
              </button>

              <button id="player-btn-toggle" type="button" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary hover:bg-primary-container text-white flex items-center justify-center shadow-md transition-all cursor-pointer" title="Putar / Jeda" aria-label="Putar atau Jeda">
                <span class="material-symbols-outlined text-[22px] sm:text-[24px]" id="player-toggle-icon">play_arrow</span>
              </button>

              <button id="player-btn-next" type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer" title="Berikutnya" aria-label="Berikutnya">
                <span class="material-symbols-outlined text-[20px]">skip_next</span>
              </button>

              <!-- Tombol Buka Popover Pilihan -->
              <button id="player-btn-menu" type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer" title="Buka Pilihan Audio (Wawancara / Tembang)" aria-label="Pilihan Audio">
                <span class="material-symbols-outlined text-[19px]">tune</span>
              </button>

              <div class="h-6 w-px bg-outline-variant/40 mx-0.5"></div>

              <button id="player-btn-close" type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface-container transition-colors cursor-pointer" title="Hentikan & Tutup Pemutar" aria-label="Tutup Pemutar">
                <span class="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', playerHtml);

    // Audio Object & Event Setup
    if (!audioInstance) {
      audioInstance = new Audio();
      audioInstance.preload = 'metadata';
    }

    if (!audioEventsBound) {
      audioEventsBound = true;
      audioInstance.addEventListener('timeupdate', () => {
        const cur = audioInstance.currentTime || 0;
        const dur = audioInstance.duration || 0;
        const curEl = document.getElementById('player-time-current');
        const durEl = document.getElementById('player-time-duration');
        const barEl = document.getElementById('player-progress-bar');

        if (curEl) curEl.textContent = formatAudioTime(cur);
        if (durEl && dur > 0) durEl.textContent = formatAudioTime(dur);
        if (barEl && dur > 0) {
          barEl.style.width = `${Math.min(100, (cur / dur) * 100)}%`;
        }
      });

      audioInstance.addEventListener('play', () => {
        isAudioPlaying = true;
        updateControlsState(true);
        if (currentChannel === 'tembang') {
          startTembangAura();
        }
        updateAudioOptionsModalUI();
      });

      audioInstance.addEventListener('pause', () => {
        isAudioPlaying = false;
        updateControlsState(false);
        if (currentChannel === 'tembang') {
          stopTembangAura(true);
        }
        updateAudioOptionsModalUI();
      });

      // Pemutaran berurutan untuk Wawancara, atau pengulangan untuk Tembang
      audioInstance.addEventListener('ended', () => {
        if (currentChannel === 'wawancara') {
          const nextIdx = currentWawancaraIndex + 1;
          if (nextIdx < WAWANCARA_PLAYLIST.length) {
            playWawancaraChannel(nextIdx, true);
          } else {
            playWawancaraChannel(0, true);
          }
        } else {
          // Tembang diulang secara halus agar suasana aura sakral berlanjut
          audioInstance.currentTime = 0;
          audioInstance.play().catch(() => {});
        }
      });
    }

    // Button event listeners pada Player Dock
    document.getElementById('player-btn-toggle')?.addEventListener('click', toggleAudioPlayback);
    
    document.getElementById('player-btn-prev')?.addEventListener('click', () => {
      if (currentChannel === 'wawancara') {
        const prevIdx = (currentWawancaraIndex - 1 + WAWANCARA_PLAYLIST.length) % WAWANCARA_PLAYLIST.length;
        playWawancaraChannel(prevIdx, true);
      } else {
        if (audioInstance) audioInstance.currentTime = 0;
      }
    });

    document.getElementById('player-btn-next')?.addEventListener('click', () => {
      if (currentChannel === 'wawancara') {
        const nextIdx = (currentWawancaraIndex + 1) % WAWANCARA_PLAYLIST.length;
        playWawancaraChannel(nextIdx, true);
      } else {
        // Beralih ke wawancara atau restart
        if (audioInstance) audioInstance.currentTime = 0;
      }
    });

    document.getElementById('player-btn-menu')?.addEventListener('click', () => {
      openAudioOptionsModal();
    });

    document.getElementById('player-btn-close')?.addEventListener('click', stopAndClosePlayer);

    // Dock quick channel switchers
    document.getElementById('dock-btn-wawancara')?.addEventListener('click', () => {
      playWawancaraChannel(currentWawancaraIndex, true);
    });

    document.getElementById('dock-btn-tembang')?.addEventListener('click', () => {
      playTembangChannel(true);
    });

    // Scrubber click to seek
    const progressContainer = document.getElementById('player-progress-container');
    progressContainer?.addEventListener('click', (e) => {
      if (!audioInstance || !audioInstance.duration) return;
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      audioInstance.currentTime = pct * audioInstance.duration;
    });

    // Delegasi klik tombol pemandu audio di header (semua halaman): Buka Modal Pilihan Opsi
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#btn-audio-guide, .btn-audio-guide, [data-action="audio-guide"]');
      if (btn && !btn.closest('#beji-audio-player') && btn.id !== 'drawer-btn-audio-guide') {
        e.preventDefault();
        openAudioOptionsModal(btn);
      }
    });

    updateAudioPlayerLanguage(window.BejiLang ? window.BejiLang.getCurrent() : 'id');
  }

  // =========================================================================
  // LOGIKA PEMUTARAN SALURAN WAWANCARA & TEMBANG
  // =========================================================================
  function playWawancaraChannel(index = null, autoPlay = true) {
    currentChannel = 'wawancara';
    if (index !== null) currentWawancaraIndex = index;
    if (currentWawancaraIndex < 0 || currentWawancaraIndex >= WAWANCARA_PLAYLIST.length) {
      currentWawancaraIndex = 0;
    }

    // Matikan visualisasi aura tembang
    stopTembangAura(true);

    const track = WAWANCARA_PLAYLIST[currentWawancaraIndex];
    injectAudioPlayer();

    const player = document.getElementById('beji-audio-player');
    if (player) player.classList.remove('hidden');
    updateFabPosition();

    audioInstance.src = track.src;
    updateAudioPlayerLanguage(window.BejiLang ? window.BejiLang.getCurrent() : 'id');

    const curEl = document.getElementById('player-time-current');
    const durEl = document.getElementById('player-time-duration');
    const barEl = document.getElementById('player-progress-bar');
    if (curEl) curEl.textContent = '00:00';
    if (durEl) durEl.textContent = track.durationStr;
    if (barEl) barEl.style.width = '0%';

    if (autoPlay) {
      const playPromise = audioInstance.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isAudioPlaying = true;
          updateControlsState(true);
          updateAudioOptionsModalUI();
        }).catch(err => {
          console.warn('Autoplay dicegah oleh browser, pengguna dapat menekan play:', err);
          isAudioPlaying = false;
          updateControlsState(false);
          updateAudioOptionsModalUI();
        });
      }
    }
  }

  function playTembangChannel(autoPlay = true) {
    currentChannel = 'tembang';
    const track = TEMBANG_TRACK;
    injectAudioPlayer();

    const player = document.getElementById('beji-audio-player');
    if (player) player.classList.remove('hidden');
    updateFabPosition();

    audioInstance.src = track.src;
    updateAudioPlayerLanguage(window.BejiLang ? window.BejiLang.getCurrent() : 'id');

    const curEl = document.getElementById('player-time-current');
    const durEl = document.getElementById('player-time-duration');
    const barEl = document.getElementById('player-progress-bar');
    if (curEl) curEl.textContent = '00:00';
    if (durEl) durEl.textContent = track.durationStr;
    if (barEl) barEl.style.width = '0%';

    if (autoPlay) {
      const playPromise = audioInstance.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isAudioPlaying = true;
          updateControlsState(true);
          startTembangAura();
          updateAudioOptionsModalUI();
        }).catch(err => {
          console.warn('Autoplay dicegah oleh browser, pengguna dapat menekan play:', err);
          isAudioPlaying = false;
          updateControlsState(false);
          updateAudioOptionsModalUI();
        });
      }
    }
  }

  function toggleAudioPlayback() {
    if (!audioInstance) {
      playWawancaraChannel(0, true);
      return;
    }
    if (audioInstance.paused) {
      if (!audioInstance.src || audioInstance.src === '' || audioInstance.src.endsWith('/')) {
        if (currentChannel === 'tembang') {
          playTembangChannel(true);
        } else {
          playWawancaraChannel(currentWawancaraIndex, true);
        }
      } else {
        audioInstance.play().then(() => {
          isAudioPlaying = true;
          updateControlsState(true);
          if (currentChannel === 'tembang') {
            startTembangAura();
          }
          updateAudioOptionsModalUI();
        }).catch(() => {});
      }
    } else {
      audioInstance.pause();
      isAudioPlaying = false;
      updateControlsState(false);
      if (currentChannel === 'tembang') {
        stopTembangAura(true);
      }
      updateAudioOptionsModalUI();
    }
  }

  function toggleAudioGuide() {
    openAudioOptionsModal();
  }

  function stopAndClosePlayer() {
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
    }
    isAudioPlaying = false;
    updateControlsState(false);
    stopTembangAura(false);
    const player = document.getElementById('beji-audio-player');
    if (player) player.classList.add('hidden');
    updateFabPosition();
    updateAudioOptionsModalUI();
  }

  function updateControlsState(isPlaying) {
    const icon = document.getElementById('player-toggle-icon');
    const disc = document.getElementById('player-disc-icon');
    if (icon) icon.textContent = isPlaying ? 'pause' : 'play_arrow';
    if (disc) disc.textContent = isPlaying ? (currentChannel === 'tembang' ? 'auto_awesome' : 'graphic_eq') : 'volume_up';
    updateHeaderButtons(isPlaying);
    updateDockChannelChips();
  }

  function updateDockChannelChips() {
    const btnW = document.getElementById('dock-btn-wawancara');
    const btnT = document.getElementById('dock-btn-tembang');
    if (!btnW || !btnT) return;

    if (currentChannel === 'tembang') {
      btnT.className = 'px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer font-bold bg-amber-500 text-amber-950 shadow-xs';
      btnW.className = 'px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer font-bold text-on-surface-variant hover:text-on-surface';
    } else {
      btnW.className = 'px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer font-bold bg-secondary text-white shadow-xs';
      btnT.className = 'px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer font-bold text-on-surface-variant hover:text-on-surface';
    }
  }

  function updateHeaderButtons(isPlaying) {
    const currentLang = window.BejiLang ? window.BejiLang.getCurrent() : 'id';
    const isJv = (currentLang === 'jv');
    document.querySelectorAll('#btn-audio-guide, .btn-audio-guide, #drawer-btn-audio-guide').forEach(btn => {
      if (btn.closest('#beji-audio-player')) return;

      const txt = btn.querySelector('#audio-guide-text, #drawer-audio-text, span.uppercase, span.font-semibold');
      const icon = btn.querySelector('.material-symbols-outlined');

      if (btn.id === 'drawer-btn-audio-guide') {
        const dText = btn.querySelector('#drawer-audio-text');
        if (dText) {
          if (isPlaying) {
            dText.textContent = currentChannel === 'tembang'
              ? (isJv ? 'Muter Kidung Beji (Aura ✨)...' : 'Memutar Tembang Beji (Aura ✨)...')
              : (isJv ? `Muter Rembagan (${currentWawancaraIndex + 1}/3)...` : `Memutar Wawancara (${currentWawancaraIndex + 1}/3)...`);
          } else {
            dText.textContent = isJv ? 'Pilihan Audio Pameran' : 'Pilihan Audio Pameran';
          }
        }
        return;
      }

      if (isPlaying) {
        if (currentChannel === 'tembang') {
          if (txt) txt.textContent = isJv ? 'Kidung Beji ✨' : 'Tembang Beji ✨';
          if (icon) icon.textContent = 'auto_awesome';
          btn.classList.add('border-amber-500', 'bg-amber-500/15', 'text-amber-800');
          btn.classList.remove('border-secondary', 'bg-surface-container');
        } else {
          if (txt) txt.textContent = isJv ? `Rembagan (${currentWawancaraIndex + 1}/3)` : `Wawancara (${currentWawancaraIndex + 1}/3)`;
          if (icon) icon.textContent = 'graphic_eq';
          btn.classList.add('border-secondary', 'bg-surface-container');
          btn.classList.remove('border-amber-500', 'bg-amber-500/15', 'text-amber-800');
        }
      } else {
        if (txt) txt.textContent = isJv ? 'Pemandu Audio' : 'Pemandu Audio';
        if (icon) icon.textContent = 'volume_up';
        btn.classList.remove('border-secondary', 'border-amber-500', 'bg-surface-container', 'bg-amber-500/15', 'text-amber-800');
      }
    });
  }

  function updateAudioPlayerLanguage(lang) {
    const isJv = (lang === 'jv');
    const badge = document.getElementById('player-track-badge');
    const autoBadge = document.getElementById('player-auto-badge');
    const titleEl = document.getElementById('player-track-title');
    const speakerEl = document.getElementById('player-track-speaker');
    const drawerAudioText = document.getElementById('drawer-audio-text');
    const discContainer = document.getElementById('player-disc-container');
    const progressBar = document.getElementById('player-progress-bar');

    if (currentChannel === 'tembang') {
      const track = TEMBANG_TRACK;
      if (badge) {
        badge.textContent = isJv ? '✨ KIDUNG LUHUR BEJI • AURA MURUB' : '✨ TEMBANG LUHUR SITUS BEJI • AURA AKTIF';
        badge.className = 'px-1.5 py-0.5 bg-amber-500 text-amber-950 text-[9px] font-mono font-bold uppercase tracking-wider shrink-0 shadow-xs';
      }
      if (autoBadge) {
        autoBadge.textContent = isJv ? 'LARAS SAKRAL PASUCIAN' : 'LANTUNAN SAKRAL TRADISIONAL';
        autoBadge.className = 'text-[9px] font-mono text-amber-700 font-bold uppercase hidden sm:inline';
      }
      if (titleEl) titleEl.textContent = isJv ? track.titleJv : track.titleId;
      if (speakerEl) speakerEl.textContent = isJv ? track.speakerJv : track.speakerId;
      if (discContainer) {
        discContainer.className = 'w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/50 text-amber-600 flex items-center justify-center shrink-0 shadow-xs';
      }
      if (progressBar) {
        progressBar.className = 'h-full bg-amber-500 rounded-full relative transition-all duration-75';
      }
    } else {
      const track = WAWANCARA_PLAYLIST[currentWawancaraIndex];
      if (badge) {
        badge.textContent = isJv ? `PERANGAN ${currentWawancaraIndex + 1} SAKING 3` : `BAGIAN ${currentWawancaraIndex + 1} DARI 3`;
        badge.className = 'px-1.5 py-0.5 bg-secondary text-white text-[9px] font-mono font-bold uppercase tracking-wider shrink-0';
      }
      if (autoBadge) {
        autoBadge.textContent = isJv ? 'MUTER GANTIAN URUT' : 'PUTAR OTOMATIS BERURUTAN';
        autoBadge.className = 'text-[9px] font-mono text-primary font-bold uppercase hidden sm:inline';
      }
      if (titleEl && track) titleEl.textContent = isJv ? track.titleJv : track.titleId;
      if (speakerEl && track) speakerEl.textContent = isJv ? track.speakerJv : track.speakerId;
      if (discContainer) {
        discContainer.className = 'w-9 h-9 rounded-full bg-secondary/15 border border-secondary/40 text-secondary flex items-center justify-center shrink-0 shadow-xs';
      }
      if (progressBar) {
        progressBar.className = 'h-full bg-secondary rounded-full relative transition-all duration-75';
      }
    }

    if (drawerAudioText) {
      drawerAudioText.textContent = isAudioPlaying
        ? (currentChannel === 'tembang'
            ? (isJv ? 'Muter Kidung Beji (Aura ✨)...' : 'Memutar Tembang Beji (Aura ✨)...')
            : (isJv ? `Muter Rembagan (${currentWawancaraIndex + 1}/3)...` : `Memutar Wawancara (${currentWawancaraIndex + 1}/3)...`))
        : (isJv ? 'Pilihan Audio Pameran' : 'Pilihan Audio Pameran');
    }

    updateHeaderButtons(isAudioPlaying);
    updateDockChannelChips();
    updateAudioOptionsModalUI();
  }

  // =========================================================================
  // PENERJEMAH TEKS TREEWALKER
  // =========================================================================
  function traverseAndTranslate(targetLang) {
    const isJv = (targetLang === 'jv');

    // 1. Update tombol bahasa di header
    const btnId = document.getElementById('lang-btn-id');
    const btnJv = document.getElementById('lang-btn-jv');
    if (btnId && btnJv) {
      const isPill = btnId.dataset.pill === 'true' || btnJv.dataset.pill === 'true';
      if (isPill) {
        if (isJv) {
          btnJv.className = 'px-2 py-0.5 rounded-full bg-primary text-white shadow-xs transition-all cursor-default';
          btnId.className = 'px-2 py-0.5 rounded-full text-text-muted hover:text-text-main transition-all cursor-pointer';
        } else {
          btnId.className = 'px-2 py-0.5 rounded-full bg-primary text-white shadow-xs transition-all cursor-default';
          btnJv.className = 'px-2 py-0.5 rounded-full text-text-muted hover:text-text-main transition-all cursor-pointer';
        }
      } else {
        if (isJv) {
          btnJv.className = 'text-primary font-bold cursor-default transition-colors';
          btnId.className = 'text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors';
        } else {
          btnId.className = 'text-primary font-bold cursor-default transition-colors';
          btnJv.className = 'text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors';
        }
      }
    }

    // 2. Set tag lang dokumen HTML
    document.documentElement.lang = isJv ? 'jv' : 'id';

    // 3. TreeWalker seluruh text node (kecuali script, style, modal internal)
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'canvas' || tag === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }
          // Biarkan modal, mobile nav drawer, audio player, audio options modal, aura, FAB dan tombol header ditangani oleh updater fungsi khusus
          if (parent.closest && (parent.closest('#credit-location-modal') || parent.closest('#mobile-nav-drawer') || parent.closest('#beji-audio-player') || parent.closest('#audio-options-modal') || parent.closest('#tembang-aura-container') || parent.closest('#tembang-aura-indicator') || parent.closest('#fab-lingkungan-3d') || parent.closest('#header-btn-lingkungan-3d'))) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.nodeValue.trim() === '') {
            return NodeFilter.FILTER_SKIP;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      if (node.__originalText === undefined) {
        node.__originalText = node.nodeValue;
      }

      if (isJv) {
        let text = node.__originalText;
        let modified = false;

        for (let i = 0; i < PHRASES.length; i++) {
          const item = PHRASES[i];
          if (text.includes(item.id)) {
            text = text.split(item.id).join(item.jv);
            modified = true;
          }
        }

        if (modified) {
          node.nodeValue = text;
        }
      } else {
        if (node.nodeValue !== node.__originalText) {
          node.nodeValue = node.__originalText;
        }
      }
    });

    // 4. Update teks di dalam modal kredit, mobile nav drawer, dan audio player
    updateModalLanguage(targetLang);
    updateMobileNavLanguage(targetLang);
    updateAudioPlayerLanguage(targetLang);

    // 5. Simpan preferensi ke localStorage
    try {
      localStorage.setItem(STORAGE_KEY, targetLang);
    } catch (e) {
      console.warn('Gagal menyimpan ke localStorage:', e);
    }

    window.dispatchEvent(new CustomEvent('beji:langchange', { detail: { lang: targetLang } }));
  }

  // Inisialisasi awal
  function init() {
    injectMobileNavStyles();
    injectCreditModal();
    injectMobileNavDrawer();
    injectHeaderLingkunganBtn();
    injectLingkunganFab();
    injectAudioPlayer();
    injectAudioOptionsModal();
    initTembangAura();

    const btnId = document.getElementById('lang-btn-id');
    const btnJv = document.getElementById('lang-btn-jv');

    if (btnId) {
      btnId.onclick = function (e) {
        e.preventDefault();
        traverseAndTranslate('id');
      };
    }

    if (btnJv) {
      btnJv.onclick = function (e) {
        e.preventDefault();
        traverseAndTranslate('jv');
      };
    }

    let initialLang = 'id';
    try {
      initialLang = localStorage.getItem(STORAGE_KEY) || 'id';
    } catch (e) {
      initialLang = 'id';
    }

    if (initialLang === 'jv') {
      traverseAndTranslate('jv');
    } else {
      traverseAndTranslate('id');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function getActiveLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'id';
    } catch (e) {
      return 'id';
    }
  }

  window.BejiLang = {
    switchTo: traverseAndTranslate,
    getCurrent: getActiveLang,
    get: getActiveLang
  };

  window.BejiAudio = {
    openModal: openAudioOptionsModal,
    playWawancara: function (idx) {
      playWawancaraChannel(typeof idx === 'number' ? idx : currentWawancaraIndex, true);
    },
    playTembang: function () {
      playTembangChannel(true);
    },
    toggle: toggleAudioPlayback,
    stop: stopAndClosePlayer
  };

})();
