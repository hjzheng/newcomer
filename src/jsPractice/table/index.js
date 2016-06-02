var data = [
    {name: 'hjzheng', age: 29, job: '码农', address: 'xi\'an'},
    {name: 'hjzheng', age: 29, job: '码农', address: 'xi\'an'},
    {name: 'hjzheng', age: 29, job: '码农', address: 'xi\'an'},
    {name: 'hjzheng', age: 29, job: '码农', address: 'xi\'an'},
    {name: 'hjzheng', age: 29, job: '码农', address: 'xi\'an'}
];

var options1 = {
    domId: 'table1',
    data: data,
    style: 'width: 600px',
    columns: [
        {label: '姓名', key: 'name'},
        {label: '年龄', key: 'age'},
        {label: '地址', key: 'address'},
        {label: '工作', key: 'job'}
    ]
};

var options2 = {
    domId: 'table2',
    data: data,
    style: 'width: 400px',
    columns: [
        {label: '姓名', key: 'name'},
        {label: '年龄', key: 'age'}
    ]
};

var options3 = {
    domId: 'table3',
    data: data,
    style: 'width: 800px; background: #ddd',
    columns: [
        {label: '姓名', key: 'name'},
        {label: '年龄', key: 'age'},
        {label: '工作', key: 'job'},
        {label: '地址', key: 'address'}
    ]
};

new Table(options1);
new Table(options2);
new Table(options3);