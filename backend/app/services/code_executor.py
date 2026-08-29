import os
import shutil
import subprocess
import tempfile


class CodeExecutor:
    def __init__(self):
        self.timeout = 5

    @staticmethod
    def normalize_language(language: str):
        normalized = (language or "").strip().lower().replace(" ", "")
        if normalized in {"c++", "cpp", "cpp14", "cplusplus"}:
            return "cpp"
        if normalized == "java":
            return "java"
        raise ValueError("Unsupported language. Only C++ and Java are supported.")

    def run_raw_code(self, code: str, language: str, stdin: str = ""):
        """Compile and run code like an online compiler: return raw output only."""
        normalized_language = self.normalize_language(language)
        if normalized_language == "java":
            return self._run_java_raw(code, stdin)
        if normalized_language == "cpp":
            return self._run_cpp_raw(code, stdin)
        raise ValueError(f"Unsupported language: {normalized_language}")

    def execute_code(self, code: str, language: str, test_cases: list):
        """Execute code and return judge-style results for submissions."""
        normalized_language = self.normalize_language(language)
        results = []

        for test_case in test_cases:
            try:
                result = self._execute_single(code, normalized_language, test_case)
                results.append(result)
            except Exception as e:
                results.append({"status": "error", "error": str(e)})

        return {
            "language": normalized_language,
            "test_cases": len(test_cases),
            "passed": sum(1 for r in results if r.get("status") == "passed"),
            "failed": sum(1 for r in results if r.get("status") == "failed"),
            "results": results,
        }

    def _execute_single(self, code: str, language: str, test_case: dict):
        """Execute a single test case using only supported languages."""
        if language == "java":
            return self._run_java(code, test_case)
        if language == "cpp":
            return self._run_cpp(code, test_case)
        raise ValueError(f"Unsupported language: {language}")

    def _run_java_raw(self, code: str, stdin: str):
        javac_path = shutil.which("javac")
        java_path = shutil.which("java")
        if not javac_path or not java_path:
            return {"status": "error", "error": "Java compiler/runtime is not installed on this machine."}

        with tempfile.TemporaryDirectory() as temp_dir:
            class_name = "Main"
            source_file = os.path.join(temp_dir, f"{class_name}.java")
            with open(source_file, "w", encoding="utf-8") as file:
                file.write(code)

            compile_result = subprocess.run(
                [javac_path, source_file],
                capture_output=True,
                text=True,
                cwd=temp_dir,
                timeout=self.timeout,
            )
            if compile_result.returncode != 0:
                return {"status": "error", "error": compile_result.stderr.strip() or compile_result.stdout.strip() or "Java compilation failed"}

            run_result = subprocess.run(
                [java_path, "-cp", temp_dir, class_name],
                input=stdin,
                capture_output=True,
                text=True,
                cwd=temp_dir,
                timeout=self.timeout,
            )
            output = run_result.stdout.strip()
            if run_result.returncode != 0:
                return {"status": "error", "error": run_result.stderr.strip() or output or "Java runtime failed"}
            return {"status": "success", "output": output}

    def _run_cpp_raw(self, code: str, stdin: str):
        gpp_path = shutil.which("g++")
        if not gpp_path:
            return {"status": "error", "error": "C++ compiler is not installed on this machine."}

        with tempfile.TemporaryDirectory() as temp_dir:
            source_file = os.path.join(temp_dir, "main.cpp")
            executable_file = os.path.join(temp_dir, "main")
            with open(source_file, "w", encoding="utf-8") as file:
                file.write(code)

            compile_result = subprocess.run(
                [gpp_path, source_file, "-o", executable_file],
                capture_output=True,
                text=True,
                cwd=temp_dir,
                timeout=self.timeout,
            )
            if compile_result.returncode != 0:
                return {"status": "error", "error": compile_result.stderr.strip() or compile_result.stdout.strip() or "C++ compilation failed"}

            run_result = subprocess.run(
                [executable_file],
                input=stdin,
                capture_output=True,
                text=True,
                cwd=temp_dir,
                timeout=self.timeout,
            )
            output = run_result.stdout.strip()
            if run_result.returncode != 0:
                return {"status": "error", "error": run_result.stderr.strip() or output or "C++ runtime failed"}
            return {"status": "success", "output": output}

    def _run_java(self, code: str, test_case: dict):
        """Compile and run Java code with judge-style expectations."""
        javac_path = shutil.which("javac")
        java_path = shutil.which("java")
        if not javac_path or not java_path:
            return {"status": "error", "error": "Java compiler/runtime is not installed on this machine."}

        with tempfile.TemporaryDirectory() as temp_dir:
            class_name = "Main"
            source_file = os.path.join(temp_dir, f"{class_name}.java")
            with open(source_file, "w", encoding="utf-8") as file:
                file.write(code)

            compile_result = subprocess.run(
                [javac_path, source_file],
                capture_output=True,
                text=True,
                cwd=temp_dir,
                timeout=self.timeout,
            )
            if compile_result.returncode != 0:
                return {
                    "status": "error",
                    "error": compile_result.stderr.strip() or compile_result.stdout.strip() or "Java compilation failed",
                }

            run_result = subprocess.run(
                [java_path, "-cp", temp_dir, class_name],
                input=test_case.get("input", ""),
                capture_output=True,
                text=True,
                cwd=temp_dir,
                timeout=self.timeout,
            )
            expected = (test_case.get("expected") or "").strip()
            output = run_result.stdout.strip()
            return {
                "status": "passed" if output == expected else "failed",
                "output": output,
                "expected": expected,
                "execution_time": 0,
                "memory_usage": 0,
            }

    def _run_cpp(self, code: str, test_case: dict):
        """Compile and run C++ code with judge-style expectations."""
        gpp_path = shutil.which("g++")
        if not gpp_path:
            return {"status": "error", "error": "C++ compiler is not installed on this machine."}

        with tempfile.TemporaryDirectory() as temp_dir:
            source_file = os.path.join(temp_dir, "main.cpp")
            executable_file = os.path.join(temp_dir, "main")
            with open(source_file, "w", encoding="utf-8") as file:
                file.write(code)

            compile_result = subprocess.run(
                [gpp_path, source_file, "-o", executable_file],
                capture_output=True,
                text=True,
                cwd=temp_dir,
                timeout=self.timeout,
            )
            if compile_result.returncode != 0:
                return {
                    "status": "error",
                    "error": compile_result.stderr.strip() or compile_result.stdout.strip() or "C++ compilation failed",
                }

            run_result = subprocess.run(
                [executable_file],
                input=test_case.get("input", ""),
                capture_output=True,
                text=True,
                cwd=temp_dir,
                timeout=self.timeout,
            )
            expected = (test_case.get("expected") or "").strip()
            output = run_result.stdout.strip()
            return {
                "status": "passed" if output == expected else "failed",
                "output": output,
                "expected": expected,
                "execution_time": 0,
                "memory_usage": 0,
            }