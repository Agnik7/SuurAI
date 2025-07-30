# SuurAI Backend

## Setup Instructions

Follow these steps to run the backend:

1. **Create a virtual environment**
   
   Open a terminal and run:
   ```powershell
   python -m venv venv
   ```

2. **Activate the virtual environment**
   
   On Windows PowerShell:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   On Command Prompt:
   ```cmd
   .\venv\Scripts\activate.bat
   ```

3. **Install dependencies**
   
   Make sure you have a `requirements.txt` file. Then run:
   ```powershell
   pip install -r requirements.txt
   ```

4. **Add the `.env` file**
   
   Create a `.env` file in the project root and add your environment variables as needed.

5. **Run the backend**
   
   Start the backend by running:
   ```powershell
   python main.py
   ```

---

For any issues, please check your Python installation and ensure all environment variables are set correctly in `.env`.
