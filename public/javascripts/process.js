link_media = ""
link_data = ""

data = [];
data = readData()
sam = data.filter(product => product.cate == "sam")

yen = data.filter(product => product.cate == "high")

nam = data.filter(product => product.cate == "nam")

loadData(content_1, yen);
loadData(content_3, sam);
loadData(content_2, nam);

function readData() {
  var data = {}
  var xml = new XMLHttpRequest()
  var tham_so = "/data"
  var Dia_chi_Dich_vu = `${link_data}${tham_so}`
  xml.open("POST", Dia_chi_Dich_vu, false)
  xml.send("")
  var str_JSON = xml.responseText
  if (str_JSON != "") {
    data = JSON.parse(str_JSON)
  }
  return data
}

function loadData(div_id, danh_sach) {
  ds = danh_sach
  div_id.innerHTML = ""
  var add_content = ""
  ds.forEach(x => {
    add_content = `
        <div class="card text-danger m-1 float-left d-none d-md-block" style="width:32%;height:30rem">
          <img class="card-img-top" style="width:100%" src="/images/all/${x.code}.jpg" alt="${x.name}">
          <div class="card-body" style="position: absolute;bottom: 0">
            <h4 class="card-title">${x.name}</h4>
            <button class="btn btn-danger" id="id_${x.code}" name="${x.name}" value="${x.price}" onclick="add_cart(this.id,this.name,this.value)">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i> ${printInt(x.price)} đồng
            </button>
            <button class="btn btn-info" id="${x.name}" name="${x.info}" onclick="info_click(this.id,this.name)">Thông tin</button>
          </div>
        </div>

        
        <div class="card text-danger m-2 float-left d-sm-block d-md-none">
          <img class="card-img-top" style="width:100%" src="/images/all/${x.code}.jpg" alt="${x.name}">
          <div class="card-body">
            <h4 class="card-title">${x.name}</h4>
            <button class="btn btn-danger" id="id_${x.code}" name="${x.name}" value="${x.price}" onclick="add_cart(this.id,this.name,this.value)">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i> ${printInt(x.price)} đồng
            </button>
            <button class="btn btn-info" id="${x.name}" name="${x.info}" onclick="info_click(this.id,this.name)">Thông tin</button>
          </div>
        </div>
        `
    div_id.innerHTML += add_content
  })
}
// Xuất đơn hàng từ phía khách hàng về
function doc_don_hang(){
  var data ={}
  var xml = new XMLHttpRequest()
  var tham_so = "hien_don_hang"
  var Dia_chi_Dich_vu = `${link_data}/${tham_so}`
  xml.open("POST",Dia_chi_Dich_vu,false)
  xml.send("")
  var str_JSON = xml.responseText
  if(str_JSON != ""){
    data = JSON.parse(str_JSON)
    return data
  }else{
    return console.log("Không có đơn hàng nào cả")
  }
}

function xuat_don_hang(divid, danh_sach){
  var ds = danh_sach
  divid.innerHTML =""
  ds.forEach(x=>{
    var content = `
    <div class="card border-primary">
      <div class="card-body">
        <h4>Đơn hàng</h4>
        <h4>Tên Khách Hàng:${x.name}</h4>
        <h4>Địa chỉ khách hàng:${x.address}</h4>
        <h4>Số Điện Thoại: ${x.phone}</h4>
        <h4>Sản Phẩm Đặt: ${x.bag.forEach(product=>{
          product.name , product.number, product.address
        })}</h4>
      </div>
    </div>`
  
    divid.innerHTML += content
  })
}
//
// Click tạo thông tin sản phẩm
function info_click(name, info) {
  info_title.innerHTML = name;
  info_body.innerHTML = info
  btn_info.click()
}
// Thêm Sản Phẩm Vào Giỏ Hàng
var html_product = []
var product = []
var customer = {}
function add_cart(code, name, str_price) {
  add_cart_html.innerHTML = ""
  var price = parseInt(str_price)
  var number = 1;
  var add = `
  <tr>
    <td>${name}</td>
    <td>
      ${number}
    </td>
    <td>Tổng tiền: ${printInt(parseInt(number)*price)}</td>
  </tr>
`
  var obj_product = {}
  obj_product.name = name
  obj_product.number = number
  obj_product.price = price

  product.push(obj_product)
  alert("Đã thêm sản phẩm vào giỏ hàng")
  html_product.push(add)
  html_product.forEach(x =>{
    add_cart_html.innerHTML += x
  })
  
}

// Gửi thông tin khách hàng vể server

pack.onclick = () =>{
  customer.name = name_customer.value
  customer.address = address_customer.value
  customer.phone = phone_customer.value
  customer.bag = product
  console.log(customer)
  alert("Đơn hàng của bạn đã được gửi đến cửa hàng.\nNếu sau 30 phút không nhận được phản hồi\ Xin gọi điện vào số điện thoai: 0908.875.055")

  var str_customer = JSON.stringify(customer)
  var xml = new XMLHttpRequest()
  var link = link_data + "/quanly"
  xml.open("POST",link,false)
  xml.send(str_customer)
}
// Xuất ra số nguyên từ chuỗi số
function printInt(So_nguyen) {
  var Chuoi_The_hien = ""
  var Chuoi_So_nguyen = So_nguyen.toString()
  var So_Ky_so = Chuoi_So_nguyen.length
  if (So_Ky_so % 3 == 0) {
    for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
      Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
      if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
        Chuoi_The_hien += "."
    }
  } else if (So_Ky_so % 3 == 1) {
    Chuoi_The_hien = Chuoi_So_nguyen[0]
    if (So_Ky_so > 1)
      Chuoi_The_hien += "."
    Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
    for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
      Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
      if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
        Chuoi_The_hien += "."

    }
  } else if (So_Ky_so % 3 == 2) {
    Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
    if (So_Ky_so > 2)
      Chuoi_The_hien += "."
    Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
    for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
      Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
      if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
        Chuoi_The_hien += "."
    }
  }
  return Chuoi_The_hien
}
