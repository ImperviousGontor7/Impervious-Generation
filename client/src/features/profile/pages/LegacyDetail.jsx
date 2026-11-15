import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiChevronDown } from "react-icons/fi";
import hero from "../../../assets/images/Jami Emas.webp";

// Lima halaman Read More menggunakan satu template dan satu route dinamis.
// Naskah sejarah di bawah dipertahankan dari materi yang kamu kirim.
const legacyPages = {
  "tegalsari": {
    "number": "01",
    "title": "Sejarah Pondok Tegalsari",
    "subtitle": "Sejarah Berdirinya Pondok Sejak Pondok Tegalsari Hingga Pondok Modern.",
    "sectionTitle": "Sejarah Pondok Tegalsari",
    "paragraphs": [
      "Pada awal abad ke-18, hiduplah seorang kyai besar keturunan bangsawan dari kerajaan Majapahit melalui Prabu Brawijaya V (Raja Terakhir Majapahit) Raden Patah (Raja Pertama Kesultanan Demak). Lalu nasabnya terus bersambung hingga mencapai ayahnya, Kyai Ageng Anom Besari. Selain dari katurunan bangsawan, Beliau juga merupakan keturunan Sunan Ampel melewati nasab ibunya Nyai Ageng Grabahan. Beliau bernama Kyai Ageng Hasan Bashari, yang mana beliau-lah yang akan menjadi cikal bakal berdirinya Pondok Modern Darussalam Gontor.",
      "Tegalsari adalah sebuah desa terpencil lebih kurang 10 KM ke arah selatan kota Ponorogo. Di tepi dua buah sungai, sungai Keyang dan sungai Malo, yang mengapit desa Tegalsari. Awalnya, Kyai Besari melakukan uzlah (mengasingkan diri untuk ibadah) dengan membabat hutan di wilayah selatan Ponorogo. Di sana, beliau mendirikan sebuah gubuk kecil dan masjid sederhana untuk mengajar agama. Karena kedalaman ilmunya dan karismanya yang luar biasa, kabar tentang keberadaan \"Sang Alim\" ini tersebar luas, sehingga santri dari berbagai penjuru Jawa mulai berdatangan dan membentuk pemukiman yang kemudian dinamakan Tegalsari. Dalam sejarahnya, Pondok Tegalsari pernah mengalami zaman keemasan berkat kealiman, kharisma, dan kepiawaian para kyai yang mengasuhnya. Ribuan santri berduyun-duyun menuntut ilmu di Pondok ini. Mereka berasal dari hampir seluruh tanah Jawa dan sekitarnya. Karena besarnya jumlah santri, seluruh desa menjadi pondok. Bahkan pondokan para santri juga didirikan di desa-desa sekitar, misalnya desa Jabung (Nglawu), desa Bantengan, dan lain-lain. Jumlah santri yang begitu besar dan berasal dari berbagai daerah dan berbagai latar belakang itu menunjukkan kebesaran lembaga pendidikan ini. Alumni Pondok ini banyak yang menjadi orang besar dan berjasa kepada bangsa Indonesia. Di antara mereka ada yang menjadi kyai, ulama, tokoh masyarakat, pejabat pemerintah, negarawan, pengusaha, dll. Sekadar menyebut sebagai contoh adalah Paku Buana II atau Sunan Kumbul, penguasa Kerajaan Kartasura; Raden Ngabehi Ronggowarsito (wafat 1803), seorang Pujangga Jawa yang masyhur; dan tokoh Pergerakan Nasional H.O.S. Cokroaminoto (wafat 17 Desember 1934).",
      "Dalam Babad Perdikan Tegalsari diceritakan tentang latar belakang Paku Buana II nyantri di Pondok Tegalsari. Pada tanggal 30 Juni 1742, di Kerajaan Kartasura terjadi pemberontakan Cina yang dipimpin oleh Raden Mas Garendi Susuhuhan Kuning, seorang Sunan keturunan Tionghoa. Serbuan yang dilakukan oleh para pemberontak itu terjadi begitu cepat dan hebat sehingga Kartasura tidak siap menghadapinya. Karena itu Paku Buana II bersama pengikutnya segera pergi dengan diam-diam meninggalkan Keraton menuju ke timur Gunung Lawu ke kota Ponorogo. Dalam pelariannya itu dia sampai di desa Tegalsari. Di tengah kekhawatiran dan ketakutan dari kejaran pasukan Sunan Kuning itulah kemudian Paku Buana II berserah diri kepada Kanjeng Kyai Hasan Besari. Penguasa Kartasura ini selanjutnya menjadi santri dari Kyai wara` itu; dia ditempa dan dibimbing untuk selalu bertafakkur dan bermunajat kepada Allah, Penguasa dari segala penguasa di semesta alam. Berkat keuletan dan kesungguhannya dalam beribadah dan berdoa serta berkat keikhlasan bimbingan dan doa Kyai Besari, Allah SWT mengabulkan doa Paku Buana II. Api pemberontakan akhirnya reda.Setelah situasi kondusif, Pakubuwono II berhasil merebut kembali takhtanya. Sebagai bentuk syukur, balas budi, dan penghormatan, raja Pakubuwono II mengangkat Kyai Hasan Besari menjadi menantunya. Sejak itu nama Kyai yang alim ini dikenal dengan sebutan Yang Mulia Kanjeng Kyai Hasan Bashari (Besari). Dan Raja Pakubuwono II juga menetapkan Desa Tegalsari sebagai Tanah Perdikan—sebuah wilayah istimewa yang dibebaskan dari segala jenis pajak kepada keraton dan memiliki hak otonom untuk mengatur rumah tangganya sendiri.",
      "Setelah Kyai Ageng Hasan Bashari wafat, beliau digantikan oleh putra ketujuh beliau yang bernama Kyai Hasan Yahya. Seterusnya Kyai Hasan Yahya digantikan oleh Kyai Bagus Hasan Bashari II yang kemudian digantikan oleh Kyai Hasan Anom. Demikianlah Pesantren Tegalsari hidup dan berkembang dari generasi ke generasi, dari pengasuh satu ke pengasuh lain. Puncak kejayaan Tegalsari terjadi pada masa kepemimpinan cucu pendiri, yaitu Kyai Kasan Besari (memerintah awal abad ke-19). Di era ini, jumlah santri mencapai ribuan orang. Tegalsari menjadi \"Universitas\" yang tidak hanya mengajarkan syariat Islam (Kitab Kuning), tetapi juga menjadi pusat kebudayaan Jawa. Tetapi, pada pertengahan abad ke-19 atau pada generasi keempat keluarga Kyai Bashari, Pesantren Tegalsari mulai surut.",
      "Alkisah, pada masa kepemimpinan Kyai Khalifah, terdapat seorang santri yang sangat menonjol dalam berbagai bidang. Namanya Sulaiman Jamaluddin, putera Panghulu Jamaluddin dan cucu Pangeran Hadiraja, Sultan Kasepuhan Cirebon. Ia sangat dekat dengan Kyainya dan Kyai pun sayang kepadanya. Maka setelah santri Sulaiman Jamaluddin dirasa telah memperoleh ilmu yang cukup, ia diambil menantu oleh Kyai dan jadilah ia Kyai muda yang sering dipercaya menggantikan Kyai untuk memimpin pesantren saat beliau berhalangan. Bahkan sang Kyai akhirnya memberikan kepercayaan kepada santri dan menantunya ini untuk mendirikan pesantren sendiri di desa Gontor. Memasuki akhir abad ke-19 dan awal abad ke-20, pengaruh Tegalsari secara institusi mulai meredup akibat tekanan pemerintah kolonial Belanda yang mencabut status tanah perdikan dan masalah internal pembagian waris."
    ]
  },
  "gontor-lama": {
    "number": "02",
    "title": "Sejarah Pondok Gontor Lama",
    "subtitle": "Sejarah Berdirinya Pondok Sejak Pondok Tegalsari Hingga Pondok Modern.",
    "sectionTitle": "Sejarah Pondok Gontor Lama",
    "paragraphs": [
      "Pada pertengahan abad ke-19, Pondok Tegalsari mulai mengalami kepadatan dan regenerasi kepemimpinan. Salah satu menantu keturunan Kyai Ageng Mohammad Besari yang bernama Kyai Muda Sulaiman Jamaluddin untuk merintis pondok pesantren seperti Tegalsari di wilayah desa Gontor. Gontor adalah sebuah desa di tengah hutan yang terletak lebih kurang 3 KM sebelah timur Tegalsari dan 11 KM ke arah tenggara dari kota Ponorogo. Pada saat itu Gontor masih merupakan kawasan hutan yang belum banyak didatangi orang. Bahkan hutan ini dikenal sebagai tempat persembunyian para perampok, penjahat, penyamun, pemabuk, dan sebagainya. Dengan 40 santri yang dibekalkan oleh Kyai Ageng Mohammad Besari kepadanya, maka berangkatlah rombongan tersebut menuju desa Gontor untuk mendirikan Pondok Gontor.",
      "Pondok Gontor yang didirikan oleh Kyai Sulaiman Jamaluddin ini terus berkembang dengan pesat, khususnya ketika dipimpin oleh putera beliau yang bernama Kyai Archam Anom Besari. Santri-santrinya berdatangan dari berbagai daerah di Jawa, konon banyak juga santri yang datang dari daerah Pasundan Jawa Barat. Setelah Kyai Archam wafat, pondok dilanjutkan oleh putera beliau bernama Santoso Anom Besari. Kyai Santoso adalah generasi ketiga dari pendiri Gontor Lama. Di bawah kepemimpinan Kyai Santoso, Pondok Lama Gontor berkembang pesat. Ratusan santri dari berbagai daerah mulai berdatangan. Gontor yang tadinya dikenal sebagai \"daerah hitam\" berubah menjadi desa santri yang religius. Kyai Santoso dikenal sebagai ulama yang sangat alim dan memiliki kedisiplinan tinggi. Beliau menikah dengan Nyai Santoso (putri dari Kyai Khalifah, tokoh ulama terpandang). Dari pasangan inilah lahir putra-putra yang kelak akan mengubah wajah pendidikan Islam di Indonesia. Namun ujian berat datang ketika Kyai Santoso Anom Besari wafat pada awal abad ke-20. Pada itu Gontor Lama mulai surut; kegiatan pendidikan dan pengajaran di pesantren mulai memudar. Di antara sebab kemundurannya adalah karena kurangnya perhatian terhadap kaderisasi.",
      "Saat beliau wafat, putra-putra beliau masih sangat kecil dan belum siap memimpin pesantren.Tanpa sosok sentral yang kuat, jumlah santri di Pondok Lama perlahan-lahan berkurang drastis. Kegiatan pengajian mulai sepi, dan fisik bangunan pondok mulai menua serta rusak. Masyarakat khawatir bahwa warisan intelektual Tegalsari di Gontor akan hilang selamanya. Tetapi rupanya Nyai Santoso tidak hendak melihat Pondok Gontor pupus dan lenyap ditelan sejarah. Ia bekerja keras mendidik putera-puterinya agar dapat meneruskan perjuangan nenek moyangnya, yaitu menghidupkan kembali Gontor yang telah mati. Ibu Nyai Santoso itupun kemudian memasukkan tiga puteranya ke beberapa pesantren dan lembaga pendidikan lain untuk memperdalam agama. Mereka adalah Ahmad Sahal (anak kelima), Zainuddin Fannani (anak keenam), dan Imam Zarkasyi (anak bungsu). Sayangnya, Ibu yang berhati mulia ini tidak pernah menyaksikan kebangkitan kembali Gontor di tangan ketiga puteranya itu. Beliau wafat saat ketiga puteranya masih dalam masa belajar. Namun, Nyai Santoso telah berwasiat kepada anak anaknya bahwa tujuan hidup anak-anaknya hanyalah satu: Kembali ke Gontor untuk mengajar.",
      "Sepeninggal Kyai Santoso Anom Besari dan seiring dengan runtuhnya kejayaan Pondok Gontor Lama, masyarakat desa Gontor dan sekitarnya yang sebelumnya taat beragama tampak mulai kehilangan pegangan. Mereka berubah menjadi masyarakat yang meninggalkan agama dan bahkan anti agama. Kehidupan mo-limo: maling (mencuri), madon (main perempuan), madat (menghisap seret), mabuk, dan main (berjudi) telah menjadi kebiasaan sehari-hari. Ini ditambah lagi dengan mewabahnya tradisi gemblakan di kalangan para warok. Demikianlah suasana dan tradisi kehidupan masyarakat Gontor dan sekitarnya setelah pudarnya masa kejayaan Pondok Gontor Lama."
    ]
  },
  "gontor-baru": {
    "number": "03",
    "title": "Sejarah Pondok Gontor Baru",
    "subtitle": "Sejarah Berdirinya Pondok Sejak Pondok Tegalsari Hingga Pondok Modern.",
    "sectionTitle": "Sejarah Pondok Gontor Baru",
    "paragraphs": [
      "Berdirinya Pondok Gontor yang baru tidak lepas dari tekad Ibu Nyai Santoso yang mengirimkan ketiga puteranya – K.H. Ahmad Sahal, K.H. Zainuddin Fannanie, K.H. Imam Zarkasyi – ke beberapa lembaga pendidikan untuk terus memperdalam ilmu. Ibu Nyai Santoso berharap agar ketiga puteranya itu kelak dapat menghidupkan kembali Pondok Gontor Lama yang telah runtuh itu. Meskipun bersaudara, mereka belajar di tempat yang berbeda-beda, mulai dari Pesantren Tebuireng, Termas, hingga ke luar negeri seperti Al-Azhar (Mesir). Pengalaman inilah yang nantinya disatukan menjadi sistem pendidikan Gontor. KH Ahmad Sahal (1901–1977): Sang konseptor dan organisator yang meletakkan dasar kemandirian pondok. KH Zainuddin Fananie (1908–1967): Sosok diplomat dan pujangga yang banyak memberikan corak intelektual. KH Imam Zarkasyi (1910–1985): Ahli metodologi pendidikan yang menyusun kurikulum modern (KMI). Pada tanggal 20 September 1926 bertepatan dengan 12 Rabi’ul Awwal 1345, di dalam peringatan Maulid Nabi, dideklarasikan pembukaan kembali Pondok Gontor.",
      "Pada 20 September 1926, Gontor resmi dibuka kembali. Namun, kondisinya saat itu sangat memprihatinkan. Masjid tua peninggalan era Pondok Lama masih beralaskan tanah dan dindingnya mulai rapuh. Santri yang datang pada awalnya hanyalah anak-anak tetangga sekitar dan beberapa santri yang setia mengikuti keluarga Besari. Pendidikan yang masih menggunakan sistem wetonan dan sorogan (tradisional), namun sudah mulai diselingi dengan disiplin waktu yang ketat. Kehidupan saat itu membuat Para pendiri (Trimurti) turun tangan langsung. KH Ahmad Sahal mengurus manajemen dan pembangunan fisik, sementara adik-adiknya mulai merumuskan materi pengajaran. Tantangan Mereka adalah harus meyakinkan masyarakat bahwa pesantren bisa menjadi tempat belajar yang bersih, teratur, dan tidak \"ketinggalan zaman\".",
      "Memasuki tahun 1930-an, Trimurti menyadari bahwa sistem tradisional murni tidak cukup untuk mencetak kader ulama yang mampu menghadapi tantangan kolonialisme. Mereka mulai melakukan eksperimen besar-besaran dengan mengadopsi sistem sekolah (klasikal). Para santri mulai diminta duduk di kursi dan menggunakan meja—sebuah pemandangan yang aneh bagi pesantren di masa itu. Trimurti mulai memperkenalkan bahasa Arab dan Inggris bukan hanya sebagai bahasa kitab, tapi sebagai alat komunikasi. Mereka bermimpi menciptakan sebuah institusi yang memiliki kemandirian seperti Al-Azhar di Mesir dan keteraturan kurikulum seperti Aligarh di India. Mereka memilih hal itu karena Trimurti pada awal pembangunan Pondok Gontor Baru mengkaji berbagai lembaga pendidikan di luar negeri yang sesuai dengan sistem pondok pesantren. Di Mesir terdapat Universitas al-Azhar yang terkenal dengan keabadiannya. Al-azhar bermula dari sebuah masjid yang didirikan oleh Penguasa Mesir dari Daulah Fatimiyyah. Universitas ini telah hidup ratusan tahun dan telah memiliki harta wakaf yang mampu memberi beasiswa kepada siswa dari seluruh dunia. Di Mauritania terdapat Pondok Syanggit. Lembaga pendidikan ini harum namanya berkat kedermawanan dan keikhlasan para pengasuhnya. Syanggit adalah lembaga pendidikan yang dikelola dengan jiwa keikhlasan; para pengasuh mendidik murid-murid siang-malam serta menanggung seluruh kebutuhan santri. Di India terdapat Universitas Muslim Aligarh. Sebuah lembaga pendidikan modern yang membekali mahasiswanya dengan ilmu pengetahuan umum dan agama serta memjadi pelopor revival of Islam. Di India juga terdapat perguruan Santiniketan, didirikan oleh Rabindranath Tagore, seorang filosuf Hindu. Perguruan yang dikenal dengan kedamaiannya ini berlokasi di kawasan hutan, serba sederhana dan telah mampu mengajar dunia. Keempat lembaga pendidikan tersebut menjadi idaman para pendiri Pondok Modern Darussalam Gontor.",
      "Tahun 1936 menjadi tonggak sejarah yang paling fundamental bagi Gontor Baru. Setelah sepuluh tahun melakukan uji coba, Trimurti merasa perlu membakukan sistem pendidikan mereka ke dalam sebuah lembaga formal. Maka, pada tanggal 19 Desember 1936, didirikanlah Kulliyatul Mu’allimin Al-Islamiyah (KMI) atau Sekolah Guru Islam. Struktur pendidikan dirancang selama 6 tahun (setingkat menengah). Kurikulum yang digunakan adalah perpaduan 100% ilmu agama dan 100% ilmu umum. Santri belajar Fiqih dan Tauhid, tapi juga belajar Geografi, Sejarah, dan Matematika dalam bahasa asing. Bahasa: Mulai diberlakukan kewajiban berbahasa Arab dan Inggris secara total di lingkungan pondok. Tujuan pendidikannya adalah Mencetak guru-guru agama yang berwawasan luas, bukan sekadar tukang doa, melainkan pemimpin masyarakat yang intelek. Dalam rentang sepuluh tahun ini, Gontor berhasil bertransformasi dari sebuah surau tradisional yang hampir punah menjadi sebuah laboratorium pendidikan modern. Tahun 1936 bukan sekadar tahun berdirinya sebuah sekolah, melainkan tahun di mana \"Jiwa Gontor\" menemukan raga atau wadah formalnya melalui KMI. Inilah yang membuat Gontor diakui sebagai pelopor pembaruan pesantren di Indonesia, karena keberaniannya mendobrak tradisi lama tanpa kehilangan nilai-nilai keislaman yang luhur."
    ]
  },
  "pmdg": {
    "number": "04",
    "title": "Sejarah Pondok Modern Darussalam Gontor",
    "subtitle": "Sejarah Berdirinya Pondok Sejak Pondok Tegalsari Hingga Pondok Modern.",
    "sectionTitle": "Sejarah Pondok Modern Darussalam Gontor",
    "paragraphs": [
      "Gagasan membangun Gontor Baru dan gambaran bentuk pendidikan dan lulusannya diilhami oleh peristiwa dalam Konggres Ummat Islam Indonesia di Surabaya. Kongres yang dilaksanakan tahun 1926 dihadiri oleh tokoh-tokoh ummat Islam Indonesia. H.O.S.Cokroaminoto, Kyai Mas Mansur, H. Agus Salim, AM. Sangaji, Usman Amin, dan lain-lain. Dalam kongres tersebut diputuskan bahwa ummat Islam Indonesia akan mengutus wakilnya ke Muktamar Islam se-Dunia yang akan diselenggarakan di Makkah. Tetapi timbul masalah tentang siapa yang akan menjadi utusan. Padahal utusan yang akan dikirim ke Muktamar tersebut harus mahir sekurang-kurangnnya dalam bahasa Arab dan Inggris. Dari peserta kongres tersebut tak seorang pun yang menguasai dua bahasa tersebut dengan baik. Akhirnya dipilih dua orang utusan, yaitu H.O.S. Cokroaminoto yang mahir berbahasa Inggris dan K.H. Mas Mansur yang menguasai bahasa Arab. Peristiwa ini mengilhami Pak Sahal yang hadir sebagai peserta konggres tersebut akan perlunya mencetak tokoh-tokoh yang memiliki kriteria di atas. Kesan Kyai Ahmad Sahal dari kongres itu menjadi topik pembicaraan dan merupakan masukan pemikiran yang sangat berharga. Kesan itu menjadi bentuk dan ciri lembaga yang akan dibina di kemudian hari.",
      "Selain itu, situasi masyarakat dan lembaga pendidikan di tanah air saat itu juga mengilhami timbulnya ide-ide mereka. Banyak sekolah yang dibina oleh zending-zending Kristen yang berasal dari Barat mengalami kemajuan yang sangat pesat. Banyak guru-guru yang pandai dan cakap dalam penguasaan materi dan metodologi pengajaran serta penguasaan ilmu jiwa dan ilmu kemasyarakatan. Sementara itu, lembaga pendidikan Islam belum mampu menyamai kemajuan mereka. Hal ini disebabkan kurangnya lembaga pendidikan Islam yang dapat mencetak guru-guru Muslim yang cakap, berilmu luas dan ikhlas dalam bekerja serta memiliki tanggung jawab untuk memajukan masyarakat. Dari sisi lain, lembaga-lembaga pendidikan yang ada pada saat itu sangat timpang. Satu lembaga pendidikan memberikan pelajaran umum saja dan mengabaikan pelajaran-pelajaran agama. Sedangkan lembaga-lembaga pendidikan lain hanya mengajarkan ilmu agama dan mengesampingkan pelajaran umum. Padahal keduanya adalah ilmu Islam dan sangat diperlukan oleh ummat Islam. Maka pondok pesantren yang akan dikembangkan itu harus memperhatikan hal ini.",
      "Situasi sosial dan politik bangsa Indonesia berpengaruh pula pada pendidikan; banyak lembaga pendidikan yang didirikan oleh partai-partai dan golongan-golongan politik. Dalam lembaga pendidikan itu ditanamkan pelajaran tentang partai atau golongan. Sehingga timbul fanatisme golongan. Sedangkan para pemimpinnya terpecah karena masuknya benih-benih perpecahan yang disebarkan oleh penjajah. Maka lembaga pendidikan itu harus dibebaskan dari kepentingan golongan atau partai politik tertentu, dan “berdiri di atas dan untuk semua golongan”. Tidak dapat disangkal bahwa ummat Islam Indonesia, juga ummat Islam di seluruh dunia, terbagi ke dalam berbagai suku, bangsa, negara, dan bahasa; mereka juga terbagi ke dalam aliran-aliran paham agama; mereka juga terbagi-bagi ke dalam kelompok-kelompok organisasi dan gerakan baik dalam bidang politik, sosial, dakwah, ekonomi, maupun yang lain. Kenyataan ini menunjukkan adanya faktor pengkategori yang beragam. Tetapi, harus tetap disadari bahwa kategori-kategori tersebut tidak bersifat mutlak. Karena itu, semua dasar klasifikasi tersebut tidak boleh dijadikan dasar pengkotak-kotakan ummat yang menjurus kepada timbulnya pertentangan dan perpecahan di antara mereka. Maka lembaga pendidikan harus berusaha menanamkan kesadaran mengenai hal ini, serta mengajarkan bahwa faktor pengkategori yang sebenarnya adalah Islam itu sendiri; ummat Islam seluruhnya adalah bersaudara dalam satu ukhuwwah diniyyah. Bangsa ini terus berkembang dan semua itu menjadi perhatian, pengamatan, dan pemikiran para pendiri Pondok Modern Darussalam Gontor. Secara bertahap sistem pendidikan di Pondok Modern Darussalam Gontor berjalan dengan berbagai percobaan pengembangan dari waktu ke waktu. Ketiga pendiri yang memiliki latar belakang pendidikan yang berbeda itu saling mengisi dan melengkapi, sehingga Balai Pendidikan Pondok Modern Darussalam Gontor menjadi seperti sekarang ini. Namun semua yang ada saat ini belum mencerminkan seluruh gagasan dan cita-cita para pendiri Gontor. Karena itu adalah tugas generasi penerus untuk memelihara, mengembangkan dan memajukan lembaga pendidikan ini demi tercapainya cita-cita para pendirinya.",
      "Salah satu tonggak sejarah terpenting \"Gontor Baru\" adalah pada tahun 1958. Trimurti mengambil keputusan yang sangat revolusioner di zamannya: Mewakafkan Pondok Modern Darussalam Gontor kepada Umat Islam. Dengan piagam ini, Gontor secara resmi bukan lagi milik keluarga Besari, bukan milik ahli waris, melainkan milik seluruh umat Islam. Pengelolaannya diserahkan kepada Badan Wakaf yang anggotanya terdiri dari para alumni dan tokoh umat. Inilah yang menjamin Gontor tetap berdiri tegak tanpa konflik internal keluarga hingga saat ini. Pada tahun 1936, didirikanlah Kulliyatul Mu’allimin Al-Islamiyah (KMI), sebuah sekolah guru Islam dengan masa belajar 6 tahun (setingkat SMP-SMA). Gontor mewajibkan penggunaan Bahasa Arab dan Bahasa Inggris dalam percakapan sehari-hari. Disiplin yang sangat ketat, kemandirian total santri, dan semboyan \"Berdikari\" menjadi ciri khas utama yang membedakannya dengan Pondok Lama. Dan inilah yang menjadi awal langkah revolusi Pondok Gontor Lama menjadi Pondok Modern Darussalam Gontor seperti yang kita kenal sekarang."
    ]
  },
  "gontor-7": {
    "number": "05",
    "title": "Sejarah Pondok Gontor 7",
    "subtitle": "Sejarah berdirinya Pondok Modern darussalam Gontor 7-Kalianda-Lampung Selatan.",
    "sectionTitle": "Sejarah Pondok Gontor Kampus 7",
    "paragraphs": [
      "Seiring dengan semakin membludaknya jumlah calon santri yang mendaftar ke Gontor Pusat di Ponorogo setiap tahunnya, Pimpinan PMDG (saat itu K.H. Abdullah Syukri Zarkasyi, K.H. Hasan Abdullah Sahal, dan K.H. Syamsul Hadi Abdan) memandang perlunya membuka cabang di luar Pulau Jawa. Lampung dipilih karena posisinya yang strategis sebagai gerbang Pulau Sumatera dan banyaknya alumni Gontor serta simpatisan yang tinggal di wilayah tersebut. Pondok Modern Darussalam Gontor (PMDG) Kampus 7 adalah salah satu cabang PMDG yang berlokasi di Dusun Kubu Panglima, Desa Tajimalela, Kecamatan Kalianda, Kabupaten Lampung Selatan. Pondok yang dibangun di atas areal tanah seluas 13,2 ha. ini mulanya adalah hasil dari wakif yang berjumlah 3 orang yaitu Bapak H. Ibrahim Sulaiman dari Jakarta asal Ambon, Bapak Daud Yusuf dari Jakarta asal Minang, dan Bapak H. Tumenggung Bahruddin. PMDG Kampus 7 yang ada sekarang ini terletak di atas tanah wakaf yang sangat strategis karena terletak di pintu gerbang Pulau Sumatera di mana mobilitas orang dan barang sangat ramai bahkan terpadat kedua setelah pantura dan juga tidak jauh dari pusat Pemerintahan Kabupaten Lampung Selatan yang berjarak kurang lebih 10 KM. Adapun penyerahan wakaf sendiri langsung dihadiri oleh 3 orang wakif yaitu Bapak H. Ibrahim Sulaiman dari Jakarta asal Ambon, Bapak Daud Yusuf dari Jakarta asal Minang, dan Bapak H. Tumenggung Bahruddin. Dihadiri saat itu langsung oleh Bapak Pimpinan Pondok Modern Darussalam Gontor, Dr. K.H Abdullah Syukri Zarkasyi, M.A.; Bupati Lampung Selatan, Bapak H. Zulkifli Anwar; dan juga hadir Menteri Agama, Bapak H. M. Maftuh Basuni, S.H., acara tersebut berlangsung di lokasi pondok saat ini pada tanggal 6 Oktober 2004 sekitar pukul 14.00 WIB. Sejak itu Pondok ini dikelola oleh Gontor dengan Al-Ustadz H. Syamsuddin Basyir, M.Pd. sebagai wakil pengasuh yang di mana beliau mengemban amanat selama 10 tahun yaitu sampai pada tahun 2014. Kemudian pada tahun tahun 2015 Pimpinan Pondok menunjuk Al-Ustadz Drs. H. Suwito Jemari sebagai Wakil Pengasuh. Lalu diteruskan pada tahun 2018 oleh Al-Ustadz Dr. H. Hariyanto Abdul Jalal, M.Pd yang mengemban amanah baru sebagai Wakil Pengasuh hingga saat ini.",
      "Seluruh kebijaksanaan di PMDG Kampus 7 mengacu kepada kebijaksanaan di Gontor secara penuh. Akan tetapi, itu tidak berarti menutup kemungkinan adanya kreativitas dan inovasi yang muncul dari pengelolanya dan semua pihak yang berada di dalamnya, terutama berkaitan dengan hal-hal yang bersifat teknis-praktis, bukan prinsip. Sistem pendidikan di KMI PMDG Kampus 7 sepenuhnya mengacu kepada sistem pendidikan KMI PMDG; baik dalam jenjang pendidikan maupun kurikulumnya, demikian pula berbagai aktivitas dan program-programnya. Di luar kelas santri pun mendapat bimbingan, pengajaran, dan pengembangan secara intensif oleh Pengasuhan santri yang bertanggungjawab menangani berbagai aktivitas ekstrakurikuler yang meliputi keorganisasian, kepramukaan, bahasa, disiplin, olahraga, ketrampilan, kesenian, akhlak, ibadah, dll. Berbagai aktivitas ini, dengan beberapa modifikasi dan inovasi, juga mengacu kepada aktivitas yang diselenggarakan oleh Pengasuhan Santri di Pondok Modern Darussalam Gontor.",
      "Seiring berjalannya waktu, Gontor 7 Kalianda berkembang pesat menjadi salah satu cabang terbesar di Sumatera. Kini fasilitas kampus tersebut telah memiliki masjid jami' yang megah, gedung pertemuan, laboratorium bahasa, serta unit-unit usaha mandiri (seperti kantin dan toko pelajar) untuk menopang ekonomi pondok. Peran Regional Gontor 7 adalah menjadi pusat ujian masuk Gontor bagi calon santri asal Sumatera Selatan, Lampung, dan Bengkulu, sehingga mereka tidak perlu jauh-jauh ke Ponorogo untuk sekadar mengikuti tes awal."
    ]
  }
};

const pageMeta = {
  tegalsari: {
    tags: ["Tegalsari", "Ponorogo", "Pesantren", "Abad ke-18"],
    quote: "Ribuan santri berduyun-duyun menuntut ilmu di Pondok ini.",
    featureQuote: "Demikianlah Pesantren Tegalsari hidup dan berkembang dari generasi ke generasi, dari pengasuh satu ke pengasuh lain.",
  },
  "gontor-lama": {
    tags: ["Gontor Lama", "Sulaiman Jamaluddin", "Ponorogo", "Abad ke-19"],
    quote: "Gontor yang tadinya dikenal sebagai daerah hitam berubah menjadi desa santri yang religius.",
    featureQuote: "Kembali ke Gontor untuk mengajar.",
  },
  "gontor-baru": {
    tags: ["Gontor Baru", "Trimurti", "1926", "Pendidikan Islam"],
    quote: "Pada tanggal 20 September 1926 bertepatan dengan 12 Rabi’ul Awwal 1345, di dalam peringatan Maulid Nabi, dideklarasikan pembukaan kembali Pondok Gontor.",
    featureQuote: "Mereka bermimpi menciptakan sebuah institusi yang memiliki kemandirian seperti Al-Azhar di Mesir dan keteraturan kurikulum seperti Aligarh di India.",
  },
  pmdg: {
    tags: ["PMDG", "KMI", "Wakaf", "Pendidikan Modern"],
    quote: "Berdiri di atas dan untuk semua golongan.",
    featureQuote: "Mewakafkan Pondok Modern Darussalam Gontor kepada Umat Islam.",
  },
  "gontor-7": {
    tags: ["Gontor 7", "Kalianda", "Lampung Selatan", "2004"],
    quote: "Seluruh kebijaksanaan di PMDG Kampus 7 mengacu kepada kebijaksanaan di Gontor secara penuh.",
    featureQuote: "Sistem pendidikan di KMI PMDG Kampus 7 sepenuhnya mengacu kepada sistem pendidikan KMI PMDG.",
  },
};

// Membagi naskah menjadi empat blok deskripsi tanpa menghilangkan paragraf.
// Untuk Gontor 7, paragraf pembuka dipisahkan pada batas kalimat yang alami
// agar layout tetap memiliki empat bagian deskripsi.
function getDescriptionGroups(page, id) {
  const paragraphs = [...page.paragraphs];

  if (paragraphs.length === 5) {
    return [[paragraphs[0]], [paragraphs[1]], [paragraphs[2]], [paragraphs[3], paragraphs[4]]];
  }

  if (paragraphs.length === 4) {
    return paragraphs.map((paragraph) => [paragraph]);
  }

  if (id === "gontor-7" && paragraphs.length === 3) {
    const splitAt = paragraphs[0].indexOf(
      "Pondok Modern Darussalam Gontor (PMDG) Kampus 7"
    );

    if (splitAt > 0) {
      return [
        [paragraphs[0].slice(0, splitAt).trim()],
        [paragraphs[0].slice(splitAt).trim()],
        [paragraphs[1]],
        [paragraphs[2]],
      ];
    }
  }

  // Fallback untuk halaman yang kelak memiliki jumlah paragraf berbeda.
  const groups = [[], [], [], []];
  paragraphs.forEach((paragraph, index) => {
    const groupIndex = Math.min(3, Math.floor((index * 4) / Math.max(paragraphs.length, 1)));
    groups[groupIndex].push(paragraph);
  });
  return groups;
}

const defaultGallery = [hero, hero, hero, hero];

function LegacyDetail() {
  const { id } = useParams();
  const page = legacyPages[id];
  const meta = pageMeta[id] || {
    tags: ["Sejarah", "Gontor", "Arsip"],
    quote: page?.subtitle || "Sejarah adalah warisan yang terus dipelajari.",
    featureQuote: page?.subtitle || "Sejarah adalah warisan yang terus dipelajari.",
  };

  if (!page) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5eee6] px-5 text-[#3c2b20]">
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.28em] text-[#9b765a]">GONTOR ARCHIVE</p>
          <h1 className="mt-3 font-serif text-6xl">404</h1>
          <p className="mt-3 text-sm text-[#796657]">Halaman sejarah tidak ditemukan.</p>
          <Link
            to="/history"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d8c4b1] px-5 py-2.5 text-sm transition hover:bg-[#ead9c8]"
          >
            <FiArrowLeft />
            Kembali ke History
          </Link>
        </div>
      </main>
    );
  }

  const descriptions = getDescriptionGroups(page, id);
  const heroImage = page.images?.hero || hero;
  const galleryImages = page.gallery?.length ? page.gallery : defaultGallery;

  const renderDescription = (paragraphs, label) => (
    <section aria-label={label} className="mx-auto max-w-3xl px-1">
      {paragraphs.map((paragraph, index) => (
        <p
          key={`${label}-${index}`}
          className="mb-4 text-[15px] leading-[1.9] text-[#49372b] last:mb-0 sm:text-base sm:leading-[1.95]"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5eee6] pb-16 text-[#38291f] selection:bg-[#c8a486]/40">
      {/* 1. MAIN HERO */}
      <section className="mx-auto max-w-360 px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <div className="group relative isolate flex min-h-82.5 items-end overflow-hidden rounded-[18px] bg-[#6d4a34] sm:min-h-97.5 lg:min-h-112.5">
          <img
            src={heroImage}
            alt={page.title}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(47,29,19,0.84)_0%,rgba(63,39,25,0.62)_40%,rgba(55,34,23,0.08)_100%),linear-gradient(0deg,rgba(36,23,17,0.36),transparent_65%)]" />

          <div className="w-full max-w-4xl px-6 py-10 text-[#fff8f0] sm:px-9 sm:py-12 lg:px-12 lg:py-14">
            <Link
              to="/history"
              className="mb-7 inline-flex items-center gap-2 text-xs tracking-[0.16em] text-[#f4dfca]/90 transition hover:text-white"
            >
              <FiArrowLeft />
              HISTORY OF GONTOR
            </Link>
            <p className="mb-4 flex items-center gap-3 text-sm tracking-[0.12em] text-[#f3dfca]">
              <span className="h-px w-10 bg-[#e7c7a8]/80" />
              CHAPTER {page.number}
            </p>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#fff4e8]/90 sm:text-base">
              {page.subtitle}
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-330 px-4 sm:px-6 lg:px-8">
        {/* 2. TAGS */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#e1cdb9] bg-[#ead9c8]/75 px-4 py-2 text-[11px] font-medium tracking-wide text-[#6d503b] sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 3. SHORT QUOTE */}
        <div className="mx-auto mt-7 max-w-3xl px-3 text-center">
          <p className="font-serif text-xl italic leading-snug text-[#4c3527] sm:text-2xl">
            “{meta.quote}”
          </p>
          <div className="mx-auto mt-6 h-px max-w-2xl bg-[#ddc9b6]" />
        </div>

        {/* 4. DESCRIPTION 1 */}
        <div className="mt-7">
          {renderDescription(descriptions[0] || [], "Description 1")}
        </div>

        {/* 5. IMAGE COLLAGE: 1 LARGE IMAGE + 2 STACKED IMAGES */}
        <section className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-[1.02fr_0.98fr] md:grid-rows-2">
          <div className="group relative min-h-70 overflow-hidden rounded-xl bg-[#dfc8b4] md:row-span-2 md:min-h-107.5">
            <img
              src={page.images?.collageMain || hero}
              alt={`${page.title} — dokumentasi utama`}
              className="h-full min-h-70 w-full object-cover transition duration-700 group-hover:scale-[1.035] md:absolute md:inset-0 md:min-h-0"
            />
          </div>
          <div className="group relative aspect-16/8 overflow-hidden rounded-xl bg-[#dfc8b4]">
            <img
              src={page.images?.collageTop || hero}
              alt={`${page.title} — detail dokumentasi pertama`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="group relative aspect-16/8 overflow-hidden rounded-xl bg-[#dfc8b4]">
            <img
              src={page.images?.collageBottom || hero}
              alt={`${page.title} — detail dokumentasi kedua`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </section>

        {/* 6. DESCRIPTION 2 */}
        <div className="mt-8">
          {renderDescription(descriptions[1] || [], "Description 2")}
        </div>

        {/* 7. SINGLE WIDE IMAGE */}
        <section className="group relative mt-8 h-47.5 overflow-hidden rounded-xl bg-[#dfc8b4] sm:h-62.5 lg:h-72.5">
          <img
            src={page.images?.feature || hero}
            alt={`${page.title} — panorama sejarah`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#2e1d14]/30 to-transparent" />
        </section>

        {/* 8. DESCRIPTION 3 */}
        <div className="mt-8">
          {renderDescription(descriptions[2] || [], "Description 3")}
        </div>

        {/* 9. QUOTE FEATURE */}
        <aside className="relative mx-auto mt-8 flex max-w-5xl items-center gap-4 overflow-hidden rounded-xl border border-[#e3cfbb] bg-[#ead9c8] px-5 py-5 sm:gap-6 sm:px-8">
          <span className="shrink-0 font-serif text-5xl leading-none text-[#9a7151]">“</span>
          <span className="h-12 w-px shrink-0 bg-[#c8a98e]" />
          <p className="relative z-10 font-serif text-lg italic leading-snug text-[#543c2b] sm:text-xl">
            {meta.featureQuote}
          </p>
          <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border-22 border-[#d1b398]/35" />
        </aside>

        {/* 10. DESCRIPTION 4 */}
        <div className="mt-8">
          {renderDescription(descriptions[3] || [], "Description 4")}
        </div>

        {/* 11. WRITER / ARCHIVE CREDIT */}
        <section className="mx-auto mt-9 flex max-w-3xl items-center gap-4 border-b border-[#d8c2ad] px-2 pb-5">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d0b49a] bg-[#e8d5c2] text-[#8c6243]">
            <FiBookOpen size={23} />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.14em] text-[#92765f]">DISUSUN OLEH</p>
            <h2 className="mt-1 font-serif text-lg text-[#493426]">Impervious Generation</h2>
            <p className="mt-0.5 text-xs text-[#816b59]">Tim Arsip Sejarah & Dokumentasi</p>
          </div>
          <div className="ml-auto hidden text-right text-xs text-[#8c735e] sm:block">
            <p>Source</p>
            <a
              href="https://www.gontor.ac.id/"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block underline decoration-[#c2a78d] underline-offset-4 hover:text-[#543c2b]"
            >
              gontor.ac.id
            </a>
          </div>
        </section>

        {/* 12. HORIZONTAL SCROLL IMAGE GALLERY */}
        <section className="mt-8" aria-label="Galeri sejarah">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-[#98785e]">VISUAL ARCHIVE</p>
              <h2 className="mt-1 font-serif text-2xl text-[#493426]">Jejak Dokumentasi</h2>
            </div>
            <span className="hidden items-center gap-2 text-xs text-[#91745b] sm:flex">
              Scroll untuk menjelajah <FiChevronDown className="-rotate-90" />
            </span>
          </div>

          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {galleryImages.map((image, index) => (
              <div
                key={`${id}-gallery-${index}`}
                className="group relative h-42.5 w-[78%] shrink-0 snap-start overflow-hidden rounded-xl bg-[#dfc8b4] sm:h-52.5 sm:w-[48%] lg:h-57.5 lg:w-[32%]"
              >
                <img
                  src={image}
                  alt={`${page.title} — galeri ${index + 1}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs tracking-[0.15em] text-white/90">
                  {page.number} / 0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

export default LegacyDetail;
