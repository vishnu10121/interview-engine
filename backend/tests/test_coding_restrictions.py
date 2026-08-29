import unittest

from app.services.code_executor import CodeExecutor


class CodeExecutorLanguageValidationTests(unittest.TestCase):
    def test_supports_only_cpp_and_java(self):
        executor = CodeExecutor()

        self.assertEqual(executor.normalize_language("c++"), "cpp")
        self.assertEqual(executor.normalize_language("C++"), "cpp")
        self.assertEqual(executor.normalize_language("java"), "java")

        with self.assertRaises(ValueError):
            executor.normalize_language("python")

        with self.assertRaises(ValueError):
            executor.normalize_language("javascript")

    def test_execute_code_rejects_unsupported_language(self):
        executor = CodeExecutor()

        with self.assertRaises(ValueError):
            executor.execute_code("print('hello')", "python", [{"input": "", "expected": "hello"}])


if __name__ == "__main__":
    unittest.main()
