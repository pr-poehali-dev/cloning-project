import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const products = [
  {
    id: 1,
    title: 'Строительные материалы',
    category: 'Материалы',
    description: 'Высококачественные строительные материалы для профессионального использования',
    price: 'от 1 500 ₽',
  },
  {
    id: 2,
    title: 'Инженерные системы',
    category: 'Инженерия',
    description: 'Проектирование и монтаж инженерных коммуникаций',
    price: 'от 50 000 ₽',
  },
  {
    id: 3,
    title: 'Отделочные работы',
    category: 'Услуги',
    description: 'Комплексная отделка помещений под ключ',
    price: 'от 2 500 ₽/м²',
  },
  {
    id: 4,
    title: 'Кровельные материалы',
    category: 'Материалы',
    description: 'Современные кровельные покрытия и комплектующие',
    price: 'от 800 ₽/м²',
  },
  {
    id: 5,
    title: 'Фасадные системы',
    category: 'Материалы',
    description: 'Вентилируемые фасады и облицовочные материалы',
    price: 'от 3 200 ₽/м²',
  },
  {
    id: 6,
    title: 'Консультации',
    category: 'Услуги',
    description: 'Техническая поддержка и консультирование специалистов',
    price: 'от 5 000 ₽',
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const categories = ['Все', 'Материалы', 'Инженерия', 'Услуги'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Все' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('https://functions.poehali.dev/1945b397-82a7-4b0b-8741-066d0bb59907', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message || 'Заявка успешно отправлена!');
        setFormData({ name: '', phone: '', email: '', subject: '' });
      } else {
        setSubmitMessage(data.error || 'Ошибка отправки заявки');
      }
    } catch (error) {
      setSubmitMessage('Ошибка соединения с сервером');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Icon name="Building2" size={28} className="text-primary" />
            <span className="text-xl font-bold">ГК Поволжье</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О компании</a>
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Товары и услуги</a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </header>

      <section id="home" className="relative bg-gradient-to-br from-primary/5 via-background to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Надёжный партнёр в строительстве
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Профессиональные строительные материалы и услуги для корпоративных клиентов. 
              Качество, проверенное временем.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base">
                Получить консультацию
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Скачать каталог
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Award" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">15+ лет на рынке</h3>
              <p className="text-muted-foreground">Опыт и надёжность в каждом проекте</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">500+ клиентов</h3>
              <p className="text-muted-foreground">Доверяют нам свои проекты</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="CheckCircle2" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">Сертифицированные материалы</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">О компании</h2>
            <p className="text-lg text-muted-foreground">
              Группа компаний «Поволжье» — ведущий поставщик строительных материалов 
              и услуг для промышленных и коммерческих объектов.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Наша миссия</h3>
              <p className="text-muted-foreground mb-6">
                Мы создаём долгосрочные партнёрские отношения с клиентами, 
                предоставляя качественные материалы и профессиональные услуги. 
                Наша цель — обеспечить успех каждого проекта.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm">Индивидуальный подход к каждому клиенту</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm">Прямые поставки от производителей</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm">Техническая поддержка на всех этапах</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                  <span className="text-sm">Гибкая система скидок для постоянных клиентов</span>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-8 space-y-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">лет опыта</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">завершённых проектов</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">удовлетворённых клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Товары и услуги</h2>
            <p className="text-lg text-muted-foreground">
              Широкий ассортимент строительных материалов и профессиональных услуг
            </p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по товарам и услугам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="Все" className="w-full mb-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Icon name="Package" size={20} className="text-muted-foreground" />
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">{product.price}</span>
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">По вашему запросу ничего не найдено</p>
            </div>
          )}
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами для получения консультации или оформления заказа
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Адрес</h3>
                  <p className="text-muted-foreground">г. Самара, ул. Промышленная, д. 15</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (846) 123-45-67</p>
                  <p className="text-muted-foreground text-sm">Пн-Пт: 9:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@gkpovolzhje.ru</p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Отправить заявку</CardTitle>
                <CardDescription>Мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Input 
                      placeholder="Ваше имя" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="Телефон" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Тема обращения" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  {submitMessage && (
                    <div className={`text-sm p-3 rounded-md ${submitMessage.includes('успешно') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {submitMessage}
                    </div>
                  )}
                  <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary/5 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Building2" size={24} className="text-primary" />
                <span className="font-bold">ГК Поволжье</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональные решения для вашего бизнеса
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#catalog" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Новости</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Поставка материалов</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Монтажные работы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Консультации</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (846) 123-45-67</li>
                <li>info@gkpovolzhje.ru</li>
                <li>г. Самара</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 ГК Поволжье. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;