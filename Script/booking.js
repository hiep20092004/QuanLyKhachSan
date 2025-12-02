// Giá phòng theo loại (VND)
const roomPrices = {
    deluxe: 2000000,
    premium: 2500000,
    suite: 3500000,
    executive: 5000000,
    presidential: 10000000,
    family: 4000000
};

// Khởi tạo date picker
flatpickr("#checkIn", {
    locale: "vn",
    dateFormat: "d/m/Y",
    minDate: "today",
    onChange: function(selectedDates) {
        // Set min date cho ngày trả phòng
        const checkOutPicker = document.querySelector("#checkOut")._flatpickr;
        checkOutPicker.set("minDate", selectedDates[0]);
        updateSummary();
    }
});

flatpickr("#checkOut", {
    locale: "vn",
    dateFormat: "d/m/Y",
    minDate: "today",
    onChange: function() {
        updateSummary();
    }
});

// Cập nhật tóm tắt khi thay đổi form
document.querySelectorAll('#adults, #children, #roomType').forEach(element => {
    element.addEventListener('change', updateSummary);
});

// Hàm format tiền tệ VND
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Hàm tính số đêm
function calculateNights(checkIn, checkOut) {
    if (!checkIn || !checkOut) return 0;
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((checkOut - checkIn) / oneDay));
}

// Cập nhật thông tin tóm tắt
function updateSummary() {
    // Lấy giá trị từ form
    const checkIn = document.querySelector("#checkIn")._flatpickr.selectedDates[0];
    const checkOut = document.querySelector("#checkOut")._flatpickr.selectedDates[0];
    const adults = parseInt(document.querySelector("#adults").value) || 0;
    const children = parseInt(document.querySelector("#children").value) || 0;
    const roomType = document.querySelector("#roomType").value;

    // Cập nhật ngày
    document.querySelector("#summaryCheckIn").textContent = checkIn ? flatpickr.formatDate(checkIn, "d/m/Y") : "--/--/----";
    document.querySelector("#summaryCheckOut").textContent = checkOut ? flatpickr.formatDate(checkOut, "d/m/Y") : "--/--/----";

    // Tính và hiển thị số đêm
    const nights = calculateNights(checkIn, checkOut);
    document.querySelector("#summaryNights").textContent = nights;

    // Cập nhật loại phòng
    const roomTypeText = roomType ? document.querySelector(`#roomType option[value="${roomType}"]`).textContent : "Chưa chọn";
    document.querySelector("#summaryRoomType").textContent = roomTypeText;

    // Cập nhật số người
    document.querySelector("#summaryGuests").textContent = `${adults} người lớn, ${children} trẻ em`;

    // Tính và hiển thị giá
    const pricePerNight = roomPrices[roomType] || 0;
    document.querySelector("#summaryPricePerNight").textContent = formatCurrency(pricePerNight);
    
    const totalPrice = pricePerNight * nights;
    document.querySelector("#summaryTotal").textContent = formatCurrency(totalPrice);
}

// Xử lý submit form
document.querySelector("#bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Kiểm tra ngày
    const checkIn = document.querySelector("#checkIn")._flatpickr.selectedDates[0];
    const checkOut = document.querySelector("#checkOut")._flatpickr.selectedDates[0];
    
    if (!checkIn || !checkOut) {
        alert("Vui lòng chọn ngày nhận phòng và trả phòng");
        return;
    }

    if (checkIn >= checkOut) {
        alert("Ngày trả phòng phải sau ngày nhận phòng");
        return;
    }

    // Lấy thông tin form
    const formData = {
        checkIn: flatpickr.formatDate(checkIn, "d/m/Y"),
        checkOut: flatpickr.formatDate(checkOut, "d/m/Y"),
        adults: document.querySelector("#adults").value,
        children: document.querySelector("#children").value,
        roomType: document.querySelector("#roomType").value,
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value,
        specialRequests: document.querySelector("#specialRequests").value
    };

    // Ở đây bạn có thể thêm code để gửi formData đến server
    console.log("Form data:", formData);
    alert("Đặt phòng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
});

// Xử lý input số người lớn
const adultsInput = document.getElementById('adults');
if (adultsInput) {
    adultsInput.addEventListener('input', function() {
        let value = parseInt(this.value);
        
        // Đảm bảo giá trị nằm trong khoảng cho phép
        if (value < 1) this.value = 1;
        if (value > 10) this.value = 10;
        if (isNaN(value)) this.value = 1;
        
        // Cập nhật tóm tắt
        updateBookingSummary();
    });
}

// Xử lý input số trẻ em
const childrenInput = document.getElementById('children');
if (childrenInput) {
    childrenInput.addEventListener('input', function() {
        let value = parseInt(this.value);
        
        // Đảm bảo giá trị nằm trong khoảng cho phép
        if (value < 0) this.value = 0;
        if (value > 5) this.value = 5;
        if (isNaN(value)) this.value = 0;
        
        // Cập nhật tóm tắt
        updateBookingSummary();
    });
}

// Cập nhật tóm tắt đặt phòng
function updateBookingSummary() {
    const adults = document.getElementById('adults').value || 0;
    const children = document.getElementById('children').value || 0;
    const summaryGuests = document.getElementById('summaryGuests');
    
    if (summaryGuests) {
        const childrenText = children > 0 ? `${children} trẻ em` : 'không có trẻ em';
        summaryGuests.textContent = `${adults} người lớn, ${childrenText}`;
    }
    
    // Cập nhật tổng tiền nếu đã chọn loại phòng
    updateTotalPrice();
}

// Thêm sự kiện cho các trường input khác
document.getElementById('roomType').addEventListener('change', updateBookingSummary);

// Hàm cập nhật tổng tiền
function updateTotalPrice() {
    const roomType = document.getElementById('roomType').value;
    const nights = calculateNights();
    
    if (!roomType || nights <= 0) return;
    
    // Giá phòng theo loại (VND)
    const prices = {
        'deluxe': 2500000,
        'premium': 3000000,
        'suite': 4000000,
        'executive': 5000000,
        'presidential': 10000000,
        'family': 3500000
    };
    
    const pricePerNight = prices[roomType] || 0;
    const total = pricePerNight * nights;
    
    // Cập nhật hiển thị
    document.getElementById('summaryPricePerNight').textContent = formatCurrency(pricePerNight);
    document.getElementById('summaryTotal').textContent = formatCurrency(total);
}

// Hàm định dạng giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Hàm tính số đêm
function calculateNights() {
    const checkIn = flatpickr.parseDate(document.getElementById('checkIn').value, 'Y-m-d');
    const checkOut = flatpickr.parseDate(document.getElementById('checkOut').value, 'Y-m-d');
    
    if (!checkIn || !checkOut) return 0;
    
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
} 