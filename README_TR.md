### `npm start` terminal üzerinden komutu girerek projeyi çalıştırabilirsiniz. Projeyi çalıştırmadan önce `npm install` komutunu çalıştırmayı unutmayın!

Proje JSONPlaceholder fake API'nı baz almaktadır. 

Proje Normal, Context ve Redux olmak üzere 3 ayrı şekilde yapılmıştır. Diğer yapıdaki projelere github hesabım üzerinden erişebilirsiniz. 
### https://github.com/shooterfanas

Projeye Ön Bakış
-----------------
- ✅Kullanıcı Girişi
- ✅Authentication bazlı private routing
- Profil sayfası (kullanıcının user, post, album ve todo bilgileri çekilir)
- ✅Todo sayfası (React Beautiful DnD)
- ✅Album sayfası (Load More)
- ✅Fotoğraflar (Album Detay Sayfası) (React Infinite Scroll Component)
- ✅Postlar sayfası (Pagination)
- Hakkımda sayfası (Proje sahibi hakkında bilgiler ve react-pdf ile pdf ön izleme)
- ✅i18 multilanguage
- Tema ayarları
- ✅Responsive
- ✅React Moment
- ✅React - Embla Carousel
- ✅yet-another-react-lightbox
- Breadcrumb
- limit ayarlamaları (sayfa başına adet vb.)

Proje Detayları
---------------
- Fake Kullanıcı Girişi: 
    - API üzerinde bulunan /users endpointinde Password bulunmadığı için email ve username (password olarak kullanılmıştır) biçiminde giriş işlemi sağlanmaktadır.
    - Cookie İşlemleri: Beni hatırla seçeneği seçilir ise 7 günlük cookie set edilir, beni hatırla seçilmez ise 10 saniyelik expire süresi bulunur (projeyi incelerken çalışabilirliği daha hızlı şekilde görmek adına bu şekilde ayarlanmıştır.) ve bu süre sonunda otomatik olarak çıkış işlemi sağlanır.
    - Home Layout her sayfada bulunan bir component olduğu için useffect ile location değerinin değişimine bağlı olarak 10 saniyede bir kontrol sağlayan interval bulunmaktadır (beni hatırla seçilmez ise alert'i hızlıca görebilmek adına bu şekilde ayarlanmıştır). Eğer cookie yok ise "checkAndLogout" fonksiyonu çalışır cookie'nin varlığını kontrol eder cookie yok ise showCountdown statetimi true yaparak kullanıcının çıkış öncesi 5 saniyelik oturum sonlandırılacağına dair alert ekrana basılır ve geri sayım sonunda kullanıcı oturumu sonlandırılarak home sayfasına yönlendirilir.

- Profil Sayfası:
    - My Posts:
        - Postların bulunduğu endpointte herhangi bir tarih değeri bulunmamaktadır. Objemizde her post'a bir tarih değeri ekliyoruz ve card üzerinde tarihi gösterip sıralama işlemimizi tarihi baz alarak yapıyoruz.
        - Server side paginate bulunmaktadır.
        - pagination için sayfa başına 2 adet olacak şekilde ayarlanmıştır toplamda endpoint üzerinden 10 adet post gelmektedir kullanıcı başına.
    - My Todos:
        - Todo sayfasındaki componentler burada da kullanılmaktadır.
    - My Albums:
        - Album sayfasındaki My Album componenti burada da kullanılmaktadır.
    - About Me:
        - API üzerinden giriş yapan kullanıcının bilgileri yer almaktadır.
        - Update butonuna tıklayarak kullanıcı bilgilerinizi güncelleyebilirsiniz (Fake API olduğu için put isteği gönderilir ama veri API de sayfa yenilendiğinde gideceği için state olarak tutulur.)

    - API'nin sunduğu endpointleri tabler halinde Post, Album, Todo ve About olarak ayrılmıştır.
    - Tüm tablerdeki veriler "components" klasörü içindeki "Datas.js" dosyasından gelmektedir.

- Posts Sayfası:
    - My Posts ve All Posts switch'ine sahiptir, my posts default olarak gelir. All posts seçildiğinde api'den gelen tüm postlar tarih değerlerine göre sıralanır.
    - All Posts pagination ile listelenir.
    - My Posts timeline tasarımı ile listelenir.
    - Timeline tasarımıyla tarih akışına göre yeniden eskiye olacak şekilde postlar sıralanır.
    - All Posts da endpointde bulunan tüm postlar çekilir ve userlar çekilir. Post userId değeri user'ın id değeri ile eşleşirse post objemize o postun sahibinin username değeri eklenir.

- Post Detay Sayfası:
    - routing ile /post/:id biçiminde posts sayfası üzerinden "Read More" linkine tıklanarak post detay sayfasına erişilir.
    - detay sayfasında url de bulunan id bilgisi useParams() hook'u ile alınır ve bu değere göre API'ye istek atılarak veri alınır.
    - post id'si ile eşleşen yorumlar post detay card'ının altına eklenir, yorumları görmek için detay "Comments" butonuna tıklayın.

- Todo Sayfası:
    - React Beautiful DnD kullanılmıştır.
    - Drag & Drop
    - kullanıcının todo verileri görünmektedir.
    - Complete olmayan bir todo'yu complete'e sürükleyip bıraktığınızda state güncellenir.
    - todoları tamamlandı olarak işaretlemek için check ikonuna basabilirsiniz.
    - Active Task aşamasındaki todolarda edit butonu, silme ve tamamlandı olarak işaretleme özellikleri bulunur. Tıklandığında input açılır ve "Enter" tuşuna basarak kayıt edilir ve state güncellenir.
    - Active Task'ta bulunan bir todoyu Completed Task'a taşırsanız otomatik olarak üstü çizilir.
    - input'u kullanarak eklemeler sağlayabilirsiniz ancak sayfayı yenilediğinizde api'den gelen veriler tekrar ekrana gelecek, eklemiş olduklarınız silinecektir.
    - API'den gelen verilere göre "completed" true olanlar Completed Tasks bölümünde gelir. False olanlar Active Task altına eklenir.
    - Active taskı completed task bölümüne taşıdığınızda state'in completed değeri true olarak güncellenir.
 
- Album Sayfası:
    - API'den albumler çekilir, post sayfasında olduğu gibi My Album ve All Album switch butonu ile içerik değiştirilebilir.
    - Album datasında album kapak fotoğrafı bulunmadığı için ilgili albumün fotoğraflarına istek atılıp random 4 adet fotoğrafı alıp kapak fotoğrafı olarak objeme ekledim.
    - Album sayfasında Load More ile yükleme tekniği kullanılmıştır.
    - Album kartında bulunan "Göz" ikonuna tıklayarak photos sayfasına erişebilirsiniz. Photos sayfasında album içerisinde bulunan fotoğraflar listelenir.
    - Album kartlarında albumün ne zaman oluşturulduğuna dair tarih bulunur (API üzerinden gelmemektedir, veri alınırken ayrıyetten eklenmiştir.)
    - Edit iconu ile album title'ı güncellenebilir.
    - Edit işlemi sonucunda save edildiğinde arkada put işlemi yapılır ve promise'ın datası alınıp elimizde bulunan state'imizin put yapmış olduğumuz id ile eşleşen objenin title değeri güncellenir ve state güncellenir.
    - X iconu ile edit işlemi iptal edilebilir.
    - Çöp kutusu ikonu ile ilgili album silinebilir.

- Photos Sayfası:
    - AlbumDetail.js'ten useParams ile id parametreyi data.js deki AlbumToPhotos fonksiyonuma id parametresini geçip API'den bu id'ye göre istek atıp verimi çekiyorum
    - Fotoğraflar'a tarih verisini ekleyip tarihe göre sıralıyorum
    - İlk 3 fotoğraf React Embla Carousel ile gösterilir, kalan fotoğraflar carousel altında infinite scroll ile listelenir.
    - Infinite Scroll özelliği bulunmaktadır.
    - Fotoğraf üzerine geldiğinizde cursor değişir, tıkladığınızda lightbox("yet-another-react-lightbox") olarak açılır.

- Photos Detay Lightbox'ı:
    - Album içindeki fotoğraflardan birine tıkladığınızda lightbox("yet-another-react-lightbox") açılır.
    - lightbox'ın sol üstünde toplam fotoğraflar içindeki mevcut fotoğraf sayısı (örn. 2/20) bilgisi yer alır.
    - lightbox açıkken sağ üstten zoom iconları yardımı ile veya ekrana çift tıklayarak/dokunarak zoom yapılabilir.
    - Fotoğraf'ın altında fotoğraf Title'ı yazar.


