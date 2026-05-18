document.addEventListener('DOMContentLoaded', function() {
    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on header
            this.classList.toggle('active');
            
            // Toggle active class on content
            const content = this.nextElementSibling;
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                // Close other open accordions (optional, can be removed to allow multiple open)
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.accordion-header').forEach(item => {
                    item.classList.remove('active');
                });
                
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });

    // Form Submission Logic
    const form = document.getElementById('refundForm');
    const formSuccess = document.getElementById('formSuccess');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Change button text to indicate loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Đang gửi... (전송 중...)';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Hide form and show success message
                form.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                console.error(response);
                alert('Đã xảy ra lỗi. Vui lòng thử lại sau. (오류가 발생했습니다. 다시 시도해 주세요.)');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau. (오류가 발생했습니다. 다시 시도해 주세요.)');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
});
