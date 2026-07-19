"""Tests for the default on-disk configuration layout."""

import os
import unittest
from pathlib import Path
from unittest.mock import patch

import config as config_module


class ConfigPathTests(unittest.TestCase):
    def test_workspace_root_supports_release_and_repository_layouts(self):
        """Both packaged and Git checkout layouts resolve to the repo root."""
        self.assertTrue(
            hasattr(config_module, "_workspace_root"),
            "config._workspace_root is required for layout-independent paths",
        )
        root = Path("D:/workspace")

        self.assertEqual(
            config_module._workspace_root(
                root / "quantclass-backend-v0.2.4" / "backend" / "config.py"
            ),
            root,
        )
        self.assertEqual(
            config_module._workspace_root(root / "backend" / "config.py"),
            root,
        )

    def test_default_quantclass_home_is_workspace_root(self):
        """A plain ``python main.py`` run keeps config/data in this workspace."""
        with patch.dict(os.environ, {"QUANTCLASS_HOME": ""}):
            backend_parent = Path(__file__).resolve().parents[2]
            workspace_root = (
                backend_parent.parent
                if backend_parent.name.lower().startswith("quantclass-backend-")
                else backend_parent
            )

            self.assertEqual(config_module._quantclass_home(), workspace_root)
            self.assertEqual(
                config_module.get_config_path(), workspace_root / "config.yaml"
            )
            self.assertEqual(
                config_module._default_data_dir(), str(workspace_root / "data")
            )


if __name__ == "__main__":
    unittest.main()
