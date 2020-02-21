import {
    app,
    contentView,
    drawer,
    Attributes,
    WebView,
    CollectionView,
    Composite,
    ImageView,
    NavigationView,
    Page,
    TextView,
    Tab,
    TabFolder
} from 'tabris';

let resource = app.getResourceLocation('resources/test.html');
console.log(resource);

const CELL_FONT = {iOS: '17px', Android: 'medium 14px'}[device.platform];

const ITEMS = [
    {title: 'Basket', image: 'resources/card-filled@2x.png'},
    {title: 'Checkout', image: 'resources/cart-filled@2x.png'}
];

// let pages = ITEMS.map((item) => <MyPage1 title={item.title}/>);
let pages = [<MyPage1 title={ITEMS[0].title} />, <MyPage2 title={ITEMS[0].title} />];

contentView.append(
    <NavigationView stretch drawerActionVisible pageAnimation='none'>
        {pages[0]}
    </NavigationView>
);

drawer.enabled = true;
drawer.append(
    <$>
        <Composite stretchX height={128} background='linear-gradient(45deg, #0288d1 10%, #00dfff)'>
            <ImageView center image={{src: 'resources/cloud-check.png', scale: 3}} tintColor='white'/>
        </Composite>
        <CollectionView stretchX bottom top='prev() 8'
                        itemCount={ITEMS.length}
                        cellHeight={48}
                        createCell={createCell}
                        updateCell={updateCell}/>
    </$>
);

const cv = drawer.find(CollectionView).only();

function createCell() {
    return (
        <Composite highlightOnTouch onTap={ev => showPage(cv.itemIndex(ev.target))}>
            <ImageView left={16} width={24} height={24} centerY tintColor='#777777'/>
            <TextView left={72} centerY font={CELL_FONT} textColor='#212121'/>
        </Composite>
    );
}

function updateCell(cell: Composite, index: number) {
    const item = ITEMS[index];
    cell.find(TextView).only().text = item ? item.title : pages[index].title;
    cell.find(ImageView).only().image = item ? item.image : 'resources/close-black-24dp@3x.png';
}

function showPage(index: number) {
    drawer.close();
    const navigationView = $(NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(pages[index]);
}

function MyPage1(attributes: Attributes<Page>) {
    return (
        <Page  {...attributes}>
            <TabFolder stretch selectionIndex={1} tabBarLocation='bottom'>
                <Tab title='Cart' image='resources/cart@2x.png' selectedImage='resources/cart-filled@2x.png'>
                    <WebView stretchX bottom top='prev() 8' url='https://www.genkgo.com'/>
                </Tab>
                <Tab title='Pay' image='resources/card@2x.png' selectedImage='resources/card-filled@2x.png' badge={5}
                     onReselect={() => console.log('reselect Pay')}>
                    <WebView stretchX bottom top='prev() 8' url={resource}/>
                </Tab>
                <Tab title='Statistic' image='resources/chart@2x.png' selectedImage='resources/chart-filled@2x.png'>
                </Tab>
            </TabFolder>
        </Page>
    );
}

function MyPage2(attributes: Attributes<Page>) {
    return (
        <Page  {...attributes}>
            <WebView stretchX bottom top='prev() 8' url='https://www.verenigingenweb.nl'/>
            <TabFolder stretch selectionIndex={1} tabBarLocation='bottom' left={0} right={0} top={0} bottom={0}>
                <Tab title='Cart' image='resources/cart@2x.png' selectedImage='resources/cart-filled@2x.png'
                     onSelect={() => showPage(0)}>
                </Tab>
                <Tab title='Pay' image='resources/card@2x.png' selectedImage='resources/card-filled@2x.png' badge={5}
                     onSelect={() => showPage(1)} onReselect={() => console.log('reselect Pay')}>
                </Tab>
                <Tab title='Statistic' image='resources/chart@2x.png' selectedImage='resources/chart-filled@2x.png'>
                </Tab>
            </TabFolder>
        </Page>
    );
}

