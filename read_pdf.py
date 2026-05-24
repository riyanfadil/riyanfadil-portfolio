import sys

try:
    import pdfplumber
    with pdfplumber.open("doc/resume.pdf") as pdf:
        for i, page in enumerate(pdf.pages):
            print(f"=== PAGE {i+1} ===")
            text = page.extract_text()
            if text:
                print(text)
except ImportError:
    print("pdfplumber not installed, trying PyPDF2...")
    try:
        import PyPDF2
        with open("doc/resume.pdf", "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for i, page in enumerate(reader.pages):
                print(f"=== PAGE {i+1} ===")
                print(page.extract_text())
    except ImportError:
        print("Neither pdfplumber nor PyPDF2 installed")
        sys.exit(1)
